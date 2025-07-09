<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Payment;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


class ContractController extends Controller
{
    public function index()
    {
        $user = User::first();
        $contracts = Contract::where('user_id', $user->id)
            ->with('plan')
            ->orderBy('started_at', 'desc')
            ->get();

        return response()->json($contracts);
    }

    public function store(Request $request)
    {
        $request->validate([
            'plan_id' => 'required|exists:plans,id'
        ]);

        $user = User::first();
        $plan = Plan::findOrFail($request->plan_id);
        $now = Carbon::now();

        $activeContract = $user->activeContract;

        $credit = 0;

        if ($activeContract) {
            $activeContract->is_active = false;
            $activeContract->ended_at = $now;
            $activeContract->save();

            $startedAt = $activeContract->started_at instanceof Carbon
                ? $activeContract->started_at
                : Carbon::parse($activeContract->started_at);

            $daysUsed = $startedAt->diffInDays($now);
            $daysInMonth = $startedAt->daysInMonth;

            $usedPercent = $daysUsed / $daysInMonth;

            $credit = $activeContract->plan->price * (1 - $usedPercent);
        }

        // Cria novo contrato ativo
        $newContract = Contract::create([
            'user_id' => $user->id,
            'plan_id' => $plan->id,
            'is_active' => true,
            'started_at' => $now,
        ]);

        // Calcula valor a pagar descontando crédito
        $amountToPay = max($plan->price - $credit, 0);

        // Calcula crédito restante, se houver
        $remainingCredit = 0;
        if ($credit > $plan->price) {
            $remainingCredit = $credit - $plan->price;
        }

        // Cria pagamento inicial
        Payment::create([
            'contract_id' => $newContract->id,
            'amount' => $amountToPay,
            'paid' => true,
            'due_date' => $now->toDateString(),
        ]);

        if ($remainingCredit > 0) {
            Payment::create([
                'contract_id' => $newContract->id,
                'amount' => 0,
                'paid' => false,
                'credit_remaining' => $remainingCredit,
                'due_date' => $now->addMonth()->toDateString(),
            ]);
        }

        return response()->json([
            'message' => 'Plano contratado com sucesso!',
            'contract' => $newContract,
            'amount_to_pay' => $amountToPay,
            'remaining_credit' => $remainingCredit,
        ]);
    }


    public function showActive()
    {
        $user = User::first();
        $activeContract = $user->getActiveContract();

        if (!$activeContract) {
            return response()->json(['message' => 'Nenhum contrato ativo.'], 404);
        }

        return response()->json($activeContract->load('plan'));
    }

    public function calculateCredit(Request $request)
    {
        $request->validate(['plan_id' => 'required|exists:plans,id']);

        $user = User::first();
        $plan = Plan::findOrFail($request->plan_id);
        $now = Carbon::now();

        $activeContract = $user->activeContract;
        $credit = 0;

        if ($activeContract) {
            $startedAt = $activeContract->started_at instanceof Carbon
                ? $activeContract->started_at
                : Carbon::parse($activeContract->started_at);

            $daysUsed = $startedAt->diffInDays($now);
            $daysInMonth = $startedAt->daysInMonth;
            $usedPercent = $daysUsed / $daysInMonth;

            $credit = $activeContract->plan->price * (1 - $usedPercent);
        }

        $amountToPay = max($plan->price - $credit, 0);

        return response()->json([
            'original_price' => round($plan->price, 2),
            'credit_applied' => round($credit, 2),
            'final_price' => round($amountToPay, 2),
        ]);
    }
}

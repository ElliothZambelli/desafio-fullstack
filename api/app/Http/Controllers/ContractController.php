<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Payment;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

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

        // Verifica contrato ativo
        $activeContract = $user->activeContract;

        $credit = 0;

        if ($activeContract) {
            // Encerrar contrato atual
            $contract = $activeContract;
            $contract->is_active = false;
            $contract->ended_at = $now;
            $contract->save();

            // Garantir que started_at é Carbon
            $startedAt = $contract->started_at instanceof Carbon
                ? $contract->started_at
                : Carbon::parse($contract->started_at);

            // Cálculo de crédito
            $daysUsed = $startedAt->diffInDays($now);
            $daysInMonth = $startedAt->daysInMonth;

            $usedPercent = $daysUsed / $daysInMonth;
            $credit = $contract->plan->price * (1 - $usedPercent);
        }

        // Criar novo contrato
        $newContract = Contract::create([
            'user_id' => $user->id,
            'plan_id' => $plan->id,
            'is_active' => true,
            'started_at' => $now,
        ]);

        // Criar pagamento com valor ajustado
        Payment::create([
            'contract_id' => $newContract->id,
            'amount' => max($plan->price - $credit, 0),
            'paid' => true,
            'due_date' => $now->toDateString(),
        ]);

        return response()->json([
            'message' => 'Plano contratado com sucesso!',
            'contract' => $newContract,
        ]);
    }

    public function showActive()
    {
        $user = User::first();
        $activeContract = $user->activeContract;

        if (!$activeContract) {
            return response()->json(['message' => 'Nenhum contrato ativo.'], 404);
        }

        return response()->json($activeContract->load('plan'));
    }
}

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
            // Desativa contrato anterior
            $activeContract->is_active = false;
            $activeContract->ended_at = $now;
            $activeContract->save();

            $startedAt = $activeContract->started_at instanceof Carbon
                ? $activeContract->started_at
                : Carbon::parse($activeContract->started_at);

            // Calculando dias usados no contrato ativo
            $daysUsed = $startedAt->diffInDays($now);

            // Dias do mês do started_at (ex: se iniciou em Junho, será 30)
            $daysInMonth = $startedAt->daysInMonth;

            // Debug: log de valores
            Log::info("Contrato ativo iniciado em: {$startedAt}");
            Log::info("Data atual: {$now}");
            Log::info("Dias usados: {$daysUsed}");
            Log::info("Dias no mês do contrato: {$daysInMonth}");

            // Percentual do mês usado
            $usedPercent = $daysUsed / $daysInMonth;

            Log::info("Percentual do mês usado: {$usedPercent}");

            // Crédito = preço plano antigo * percentual não usado
            $credit = $activeContract->plan->price * (1 - $usedPercent);

            Log::info("Crédito calculado: {$credit}");
        }

        // Cria novo contrato ativo
        $newContract = Contract::create([
            'user_id' => $user->id,
            'plan_id' => $plan->id,
            'is_active' => true,
            'started_at' => $now,
        ]);

        // Valor a pagar no novo plano descontando o crédito
        $amountToPay = max($plan->price - $credit, 0);

        Log::info("Novo plano: {$plan->id} - Preço: {$plan->price}");
        Log::info("Valor a pagar descontando crédito: {$amountToPay}");

        // Cria pagamento para novo contrato
        Payment::create([
            'contract_id' => $newContract->id,
            'amount' => $amountToPay,
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
        $activeContract = $user->getActiveContract();

        if (!$activeContract) {
            return response()->json(['message' => 'Nenhum contrato ativo.'], 404);
        }

        return response()->json($activeContract->load('plan'));
    }
}

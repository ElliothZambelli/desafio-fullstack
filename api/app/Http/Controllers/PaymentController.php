<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    // Lista todos os pagamentos do contrato ativo do usuário
    public function index()
    {
        $user = User::first();
        $contract = $user->activeContract;

        if (!$contract) {
            return response()->json(['message' => 'Nenhum contrato ativo encontrado.'], 404);
        }

        $payments = $contract->payments()->orderBy('due_date', 'desc')->get();

        return response()->json($payments);
    }

    public function store(Request $request)
    {
        $request->validate([
            'contract_id' => 'required|exists:contracts,id',
            'amount' => 'required|numeric|min:0',
        ]);

        $payment = Payment::create([
            'contract_id' => $request->contract_id,
            'amount' => $request->amount,
            'paid' => true,
            'due_date' => now()->toDateString(),
        ]);

        return response()->json([
            'message' => 'Pagamento registrado com sucesso!',
            'payment' => $payment
        ]);
    }
}

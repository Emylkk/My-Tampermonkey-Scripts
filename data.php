<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Carbon\CarbonTimeZone;
use Cron\DayOfWeekField;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;

class ProductListController extends Controller
{

    public function __construct(
        User $usuario,
        Request $request,
        Carbon $carbon
    ) {
        date_default_timezone_set('America/Sao_Paulo');

        $this->usuario = $usuario;
        $this->request = $request;
        $this->carbon = $carbon;
    }


    public function index($id)
    {
        date_default_timezone_set('America/Sao_Paulo');

        // return response()->json($this->request->is('api/admin/compras/*'));

        $tz = new CarbonTimeZone();
        $this->carbon->setTimeZone('America/Sao_Paulo');
        return $this->carbon->now();


        //Horarios de funcionamento

        $start = Carbon::createFromTimeString('11:49 AM');
        $end = Carbon::createFromTimeString('08:00 PM');

        if ($now->between($start, $end)) {
            return 'entre';
        }
        return 'saia';



        /*
        //Transformar os dias da Semana em String para salvar no banco
        $dayofW = serialize([0, 1, 2, 3, 4, 5, 6]);
        //Destransformar a string em um array novamente
        $dayofweek = unserialize($dayofW);
        //checar se os dias batem
        foreach ($dayofweek as $key => $dia) {
            $hoje = date('w');
            if ($hoje == $dia) {
                return 'aberto';
            }
        }
        return 'fechado';
*/

        return date('w');
        $r = $this->usuario->where('id', $id)->first()->with('buyedProducts.product')->get();
        return response()->json($r);
    }
}

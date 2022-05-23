<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\VerifiesEmails;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VerificationController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Email Verification Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling email verification for any
    | user that recently registered with the application. Emails may also
    | be re-sent if the user didn't receive the original email message.
    |
    */

    use VerifiesEmails;

    /**
     * Where to redirect users after verification.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }
    public function verify(request $request, $id, $hash)
    {
        $usuario = $this->user->find($id);
        $request->request->add(['id', $id, 'hash' => $hash]);
        abort_if((!$usuario), 403);

        abort_if((!hash_equals((string) $request->hash, sha1($usuario->getEmailForVerification()))), 403);


        if ($usuario->hasVerifiedEmail()) {
            return 'usuario já verificado';
        }

        if ($usuario->markEmailAsVerified()) {
            event(new Verified($request->user()));
            return 'verificado';
        }

        if ($response = $this->verified($request)) {
            return 'verificado';
        }
    }
}

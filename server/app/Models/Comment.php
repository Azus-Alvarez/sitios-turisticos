<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'content','moment','calification','approval',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function User()
    {
       return $this->hasOne('App\User');
    }

    function Site()
    {
       return $this->hasOne('App\Site');
    }

}
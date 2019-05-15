<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Site extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'name','description','location_latitude','location_longitude',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function SiteImage()
    {
       return $this->hasOne('App\SiteImage');
    }

    function Comment()
    {
       return $this->belongsTo('App\Comment');
    }

}
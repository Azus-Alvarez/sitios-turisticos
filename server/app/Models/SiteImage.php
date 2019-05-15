<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SiteImage extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'site_image_file_type','site_image_file_name','site_image_file',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function Site()
    {
       return $this->belongsTo('App\Site');
    }

}
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Site;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class SiteController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Site::get(),200);
       } else {
          $site = Site::findOrFail($id);
          $attach = [];
          return response()->json(["Site"=>$site, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Site::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $site = new Site();
          $lastSite = Site::orderBy('id')->get()->last();
          if($lastSite) {
             $site->id = $lastSite->id + 1;
          } else {
             $site->id = 1;
          }
          $site->name = $result['name'];
          $site->description = $result['description'];
          $site->location_latitude = $result['location_latitude'];
          $site->location_longitude = $result['location_longitude'];
          $site->site_image_id = $result['site_image_id'];
          $site->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($site,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $site = Site::where('id',$result['id'])->update([
             'name'=>$result['name'],
             'description'=>$result['description'],
             'location_latitude'=>$result['location_latitude'],
             'location_longitude'=>$result['location_longitude'],
             'site_image_id'=>$result['site_image_id'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($site,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return Site::destroy($id);
    }

    function backup(Request $data)
    {
       $sites = Site::get();
       $toReturn = [];
       foreach( $sites as $site) {
          $attach = [];
          array_push($toReturn, ["Site"=>$site, "attach"=>$attach]);
       }
       return response()->json($toReturn,200);
    }

    function masiveLoad(Request $data)
    {
      $incomming = $data->json()->all();
      $masiveData = $incomming['data'];
      try{
       DB::beginTransaction();
       foreach($masiveData as $row) {
         $result = $row['Site'];
         $exist = Site::where('id',$result['id'])->first();
         if ($exist) {
           Site::where('id', $result['id'])->update([
             'name'=>$result['name'],
             'description'=>$result['description'],
             'location_latitude'=>$result['location_latitude'],
             'location_longitude'=>$result['location_longitude'],
             'site_image_id'=>$result['site_image_id'],
           ]);
         } else {
          $site = new Site();
          $site->id = $result['id'];
          $site->name = $result['name'];
          $site->description = $result['description'];
          $site->location_latitude = $result['location_latitude'];
          $site->location_longitude = $result['location_longitude'];
          $site->site_image_id = $result['site_image_id'];
          $site->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}
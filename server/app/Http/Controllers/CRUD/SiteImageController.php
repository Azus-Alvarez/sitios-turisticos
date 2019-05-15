<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\SiteImage;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class SiteImageController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(SiteImage::get(),200);
       } else {
          $siteimage = SiteImage::findOrFail($id);
          $attach = [];
          return response()->json(["SiteImage"=>$siteimage, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(SiteImage::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $siteimage = new SiteImage();
          $lastSiteImage = SiteImage::orderBy('id')->get()->last();
          if($lastSiteImage) {
             $siteimage->id = $lastSiteImage->id + 1;
          } else {
             $siteimage->id = 1;
          }
          $siteimage->site_image_file_type = $result['site_image_file_type'];
          $siteimage->site_image_file_name = $result['site_image_file_name'];
          $siteimage->site_image_file = $result['site_image_file'];
          $siteimage->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($siteimage,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $siteimage = SiteImage::where('id',$result['id'])->update([
             'site_image_file_type'=>$result['site_image_file_type'],
             'site_image_file_name'=>$result['site_image_file_name'],
             'site_image_file'=>$result['site_image_file'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($siteimage,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return SiteImage::destroy($id);
    }

    function backup(Request $data)
    {
       $siteimages = SiteImage::get();
       $toReturn = [];
       foreach( $siteimages as $siteimage) {
          $attach = [];
          array_push($toReturn, ["SiteImage"=>$siteimage, "attach"=>$attach]);
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
         $result = $row['SiteImage'];
         $exist = SiteImage::where('id',$result['id'])->first();
         if ($exist) {
           SiteImage::where('id', $result['id'])->update([
             'site_image_file_type'=>$result['site_image_file_type'],
             'site_image_file_name'=>$result['site_image_file_name'],
             'site_image_file'=>$result['site_image_file'],
           ]);
         } else {
          $siteimage = new SiteImage();
          $siteimage->id = $result['id'];
          $siteimage->site_image_file_type = $result['site_image_file_type'];
          $siteimage->site_image_file_name = $result['site_image_file_name'];
          $siteimage->site_image_file = $result['site_image_file'];
          $siteimage->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}
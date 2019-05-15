<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Comment;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CommentController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Comment::get(),200);
       } else {
          $comment = Comment::findOrFail($id);
          $attach = [];
          return response()->json(["Comment"=>$comment, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Comment::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $comment = new Comment();
          $lastComment = Comment::orderBy('id')->get()->last();
          if($lastComment) {
             $comment->id = $lastComment->id + 1;
          } else {
             $comment->id = 1;
          }
          $comment->content = $result['content'];
          $comment->moment = $result['moment'];
          $comment->calification = $result['calification'];
          $comment->approval = $result['approval'];
          $comment->user_id = $result['user_id'];
          $comment->site_id = $result['site_id'];
          $comment->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($comment,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $comment = Comment::where('id',$result['id'])->update([
             'content'=>$result['content'],
             'moment'=>$result['moment'],
             'calification'=>$result['calification'],
             'approval'=>$result['approval'],
             'user_id'=>$result['user_id'],
             'site_id'=>$result['site_id'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($comment,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return Comment::destroy($id);
    }

    function backup(Request $data)
    {
       $comments = Comment::get();
       $toReturn = [];
       foreach( $comments as $comment) {
          $attach = [];
          array_push($toReturn, ["Comment"=>$comment, "attach"=>$attach]);
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
         $result = $row['Comment'];
         $exist = Comment::where('id',$result['id'])->first();
         if ($exist) {
           Comment::where('id', $result['id'])->update([
             'content'=>$result['content'],
             'moment'=>$result['moment'],
             'calification'=>$result['calification'],
             'approval'=>$result['approval'],
             'user_id'=>$result['user_id'],
             'site_id'=>$result['site_id'],
           ]);
         } else {
          $comment = new Comment();
          $comment->id = $result['id'];
          $comment->content = $result['content'];
          $comment->moment = $result['moment'];
          $comment->calification = $result['calification'];
          $comment->approval = $result['approval'];
          $comment->user_id = $result['user_id'];
          $comment->site_id = $result['site_id'];
          $comment->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}
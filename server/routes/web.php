<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
   return 'Web Wervice Realizado con LSCodeGenerator';
});

$router->group(['middleware' => []], function () use ($router) {
   $router->post('/login', ['uses' => 'AuthController@login']);
   $router->post('/register', ['uses' => 'AuthController@register']);
   $router->post('/password_recovery_request', ['uses' => 'AuthController@passwordRecoveryRequest']);
   $router->get('/password_recovery', ['uses' => 'AuthController@passwordRecovery']);
});

$router->group(['middleware' => ['auth']], function () use ($router) {
   $router->post('/user/password_change', ['uses' => 'AuthController@passwordChange']);


   //SITIOSTURISTICOS

   //CRUD ProfilePicture
   $router->post('/profilepicture', ['uses' => 'ProfilePictureController@post']);
   $router->get('/profilepicture', ['uses' => 'ProfilePictureController@get']);
   $router->get('/profilepicture/paginate', ['uses' => 'ProfilePictureController@paginate']);
   $router->put('/profilepicture', ['uses' => 'ProfilePictureController@put']);
   $router->delete('/profilepicture', ['uses' => 'ProfilePictureController@delete']);

   //CRUD User
   $router->post('/user', ['uses' => 'UserController@post']);
   $router->get('/user', ['uses' => 'UserController@get']);
   $router->get('/user/paginate', ['uses' => 'UserController@paginate']);
   $router->put('/user', ['uses' => 'UserController@put']);
   $router->delete('/user', ['uses' => 'UserController@delete']);

   //CRUD SiteImage
   $router->post('/siteimage', ['uses' => 'SiteImageController@post']);
   $router->get('/siteimage', ['uses' => 'SiteImageController@get']);
   $router->get('/siteimage/paginate', ['uses' => 'SiteImageController@paginate']);
   $router->get('/siteimage/backup', ['uses' => 'SiteImageController@backup']);
   $router->put('/siteimage', ['uses' => 'SiteImageController@put']);
   $router->delete('/siteimage', ['uses' => 'SiteImageController@delete']);
   $router->post('/siteimage/masive_load', ['uses' => 'SiteImageController@masiveLoad']);

   //CRUD Site
   $router->post('/site', ['uses' => 'SiteController@post']);
   $router->get('/site', ['uses' => 'SiteController@get']);
   $router->get('/site/paginate', ['uses' => 'SiteController@paginate']);
   $router->get('/site/backup', ['uses' => 'SiteController@backup']);
   $router->put('/site', ['uses' => 'SiteController@put']);
   $router->delete('/site', ['uses' => 'SiteController@delete']);
   $router->post('/site/masive_load', ['uses' => 'SiteController@masiveLoad']);

   //CRUD Comment
   $router->post('/comment', ['uses' => 'CommentController@post']);
   $router->get('/comment', ['uses' => 'CommentController@get']);
   $router->get('/comment/paginate', ['uses' => 'CommentController@paginate']);
   $router->get('/comment/backup', ['uses' => 'CommentController@backup']);
   $router->put('/comment', ['uses' => 'CommentController@put']);
   $router->delete('/comment', ['uses' => 'CommentController@delete']);
   $router->post('/comment/masive_load', ['uses' => 'CommentController@masiveLoad']);
});

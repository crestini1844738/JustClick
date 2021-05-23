/*
THIS IS THE OFFICIAL DOCUMENTATION OF JUSTCLICK APIs
IT'S ALL RESTFUL FOLKS!!!
*/

/**
 * 
 * @api {get} /api/getPopolari GetPopolari: Returns popular courses
 * 
 * @apiName GetPopolari
 * 
 * @apiDescription gets all the popular courses returned in a JSON file
 * 
 * example object: { corsi: [ {course1...},{course2...}, ...]}
 * 
 * @apiError 404PopularError No popular courses found
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No Popular Courses Found"
 *     }
 * 
 * @apiExample {curl} Example usage:
 *     curl -X GET http://localhost:8889/api/getPopolari
 * 
 * @apiGroup Courses
 * 
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       'content-type': 'application/json'
 *     }
 * 
 * @apiSuccess {Object[]} Course Object that conatins a list with all popular courses
 * 
 * @apiSuccessExample {json} Success-Response:
 *     { 
 *       "corsi":[{
 *          "_id":"InformaticGeek",
 *          "_rev":"280-25a03b9f863e6d2c0e1cf47db12309e1",
 *          "courseName":"InformaticGeek",
 *          "author":"Valerio",
 *          "desc":"undefined",
 *          "image":"loaded",
 *          "category":"Informatica",
 *          "courseFollower":0,
 *          "coursePublications":0,
 *          "firstEvidenza":[],
 *          "secondEvidenza":[],
 *          "thirdEvidenza":[],
 *          "courses":[],
 *          "follower": []
 *        }]
 *     }
 * 
 *  @apiVersion 0.1.0
 */



/**
 * @api {post} /api/profiloUtente GetPofiloUtente: Returns a user's profile
 * 
 * @apiName GetProfiloUtente
 * 
 * @apiDescription returns the json file with the specified user data
 * 
 * example object: { user: {info1,info2, ...}}
 * 
 * @apiError 404PopularError User not found
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User not found"
 *     }
 * 
 * @apiGroup Users
 * 
 * @apiExample {curl} Example usage:
 *      curl -X POST http://localhost:8889/api/profiloUtente?username=prova55
 * 
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       'content-type': 'application/json'
 *     }
 * 
 * @apiSuccess {Object[]} User Object that conatins the data of a user
 * 
 * @apiSuccessExample {json} Success-Response:
 *     {
 *       "username": "Username",
 *       "Name": "NameUser",
 *       "Surname": "SurnameUser",
 *       "Email": emailUser@mail.domain,
 *       ...
 *     }
 * 
 *  @apiVersion 0.1.0
 */

/**
 * @api {post} /api/corsiUtente GetCorsiUtente: Returns a user's courses
 * 
 * @apiName GetCorsiUtente
 * 
 * @apiDescription returns the json file with the courses data of the specified user
 * 
 * example object: { courses: [{corso1...},{corso2...} ...]}
 * 
 * @apiError 404PopularError User not found
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User not found"
 *     }
 * 
 * @apiGroup Users
 * @apiExample {curl} Example usage:
 *      curl -X POST http://localhost:8889/api/corsiUtente?username=prova1
 * 
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       'content-type': 'application/json'
 *     }
 * 
 * @apiSuccess {Object[]} Course Object that conatins the courses data of a specified user
 * 
 * @apiSuccessExample {json} Success-Response:
 *     {
 *       "id": "123456",
 *       "rev": "a1b2c3",
 *       "courseName": "Name",
 *       "desc": desc,
 *       ...
 *     }
 * 
 *  @apiVersion 0.1.0
 */


/**
 * 
 * @api {get} /api/search?search=regex Search: Returns all courses whose name matches regex
 * 
 * @apiName Search
 * 
 * @apiDescription Returns all courses whose name matches regex (case insensitive)
 * 
 * @apiError 404SearchError No Courses found
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No Courses Found"
 *     }
 * 
 * @apiExample {curl} Example usage:
 *     curl -X GET http://localhost:8889/api/search?search=inf
 * 
 * @apiGroup Courses
 * 
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       'content-type': 'application/json'
 *     }
 * 
 * @apiSuccess Array[] Array that conatins a list with all searched courses
 * 
 * @apiSuccessExample {json} Success-Response:
 *     [{
 *          "_id":"InformaticGeek",
 *          "_rev":"280-25a03b9f863e6d2c0e1cf47db12309e1",
 *          "courseName":"InformaticGeek",
 *          "author":"Valerio",
 *          "desc":"undefined",
 *          "image":"loaded",
 *          "category":"Informatica",
 *          "courseFollower":0,
 *          "coursePublications":0,
 *          "firstEvidenza":[],
 *          "secondEvidenza":[],
 *          "thirdEvidenza":[],
 *          "courses":[],
 *          "follower": []
 *      }]
 * 
 *  @apiVersion 0.1.0
 */


/**
 * 
 * @api {get} /api/getCorso/:courseName GetCorso: Returns the course named courseName
 * 
 * @apiName GetCorso
 * 
 * @apiDescription Returns the public data for the course named courseName
 * 
 * @apiError 404SearchError Course Not found
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Course Not Found"
 *     }
 * 
 * @apiExample {curl} Example usage:
 *     curl -X GET http://localhost:8889/api/getCorso/InformaticGeek
 * 
 * @apiGroup Courses
 * 
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       'content-type': 'application/json'
 *     }
 * 
 * @apiSuccess {Object} Object with the public data of the specified course
 * 
 * @apiSuccessExample {json} Success-Response:
 *     {
 *          "_id":"InformaticGeek",
 *          "_rev":"280-25a03b9f863e6d2c0e1cf47db12309e1",
 *          "courseName":"InformaticGeek",
 *          "author":"Valerio",
 *          "desc":"undefined",
 *          "image":"loaded",
 *          "category":"Informatica",
 *          "courseFollower":0,
 *          "coursePublications":0,
 *          "firstEvidenza":[],
 *          "secondEvidenza":[],
 *          "thirdEvidenza":[],
 *          "courses":[],
 *          "follower": []
 *      }
 * 
 *  @apiVersion 0.1.0
 */


/**
 * 
 * @api {get} /api/getMateriale/:courseName GetMateriale: Returns the material of courseName
 * 
 * @apiName GetCorso
 * 
 * @apiDescription Returns the material of the course named courseName (if it exists)
 * 
 * @apiError 404SearchError Material Not found
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Material Not Found"
 *     }
 * 
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Course Pippo does not exist"
 *     }
 * 
 * @apiExample {curl} Example usage:
 *     curl -X GET http://localhost:8889/api/getMateriale/InformaticGeek
 * 
 * @apiGroup Courses
 * 
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       'content-type': 'application/json'
 *     }
 * 
 * @apiSuccess Array[] Array with the material of the specified course
 * 
 * @apiSuccessExample {json} Success-Response:
 *     [
 *          ["create.jpg","","image/jpg"],
 *          ["coldplay.mp3","that's a song!","audio/mpeg"]
 *      ]
 * 
 *  @apiVersion 0.1.0
 */


/**
 * 
 * @api {get} /api/getByCategory?q=category GetByCategory: Returns all courses of a specified category
 * 
 * @apiName GetByCategory
 * 
 * @apiDescription Returns all courses of a specified category
 *                 The category must be one of these (mind the case!): Musica, Informatica, Videogiochi, Moda, Notizie, Scuola, Sport
 * 
 * @apiError 404SearchError No Courses found
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No Courses Found"
 *     }
 * 
 * @apiExample {curl} Example usage:
 *     curl -X GET http://localhost:8889/api/search?q=Informatica
 * 
 * @apiGroup Courses
 * 
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       'content-type': 'application/json'
 *     }
 * 
 * @apiSuccess Array[{Object}] Array that conatins a list with all courses of the selected category
 * 
 * @apiSuccessExample {json} Success-Response:
 *     [{
 *          "_id":"InformaticGeek",
 *          "_rev":"280-25a03b9f863e6d2c0e1cf47db12309e1",
 *          "courseName":"InformaticGeek",
 *          "author":"Valerio",
 *          "desc":"undefined",
 *          "image":"loaded",
 *          "category":"Informatica",
 *          "courseFollower":0,
 *          "coursePublications":0,
 *          "firstEvidenza":[],
 *          "secondEvidenza":[],
 *          "thirdEvidenza":[],
 *          "courses":[],
 *          "follower": []
 *      }]
 * 
 *  @apiVersion 0.1.0
 */
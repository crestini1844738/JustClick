/*
THESE IS THE OFFICIAL JUSTCLICK API DOCUMENTATION
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
 *       "courseName": "sampleCourse",
 *       "author": "Valerio",
 *       "category": "Informatica",
 *       "followers": 0,
 *       ...
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
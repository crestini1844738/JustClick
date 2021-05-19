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
 * example object: { corsi: [ {course1...} {course2...} ...]}
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
 * 
 * 
 */
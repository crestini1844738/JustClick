define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "API_JustClick/apidoc/main.js",
    "group": "/home/confirm/Desktop/progetto_ltw+rdc/JustClick/API_JustClick/apidoc/main.js",
    "groupTitle": "/home/confirm/Desktop/progetto_ltw+rdc/JustClick/API_JustClick/apidoc/main.js",
    "name": ""
  },
  {
    "type": "get",
    "url": "/api/getPopolari",
    "title": "GetPopolari: Returns popular courses",
    "name": "GetPopolari",
    "description": "<p>gets all the popular courses returned in a JSON file</p> <p>example object: { corsi: [ {course1...} {course2...} ...]}</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404PopularError",
            "description": "<p>No popular courses found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"No Popular Courses Found\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X GET http://localhost:8889/api/getPopolari",
        "type": "curl"
      }
    ],
    "group": "Courses",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  'content-type': 'application/json'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Course",
            "description": "<p>Object that conatins a list with all popular courses</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"courseName\": \"sampleCourse\",\n  \"author\": \"Valerio\",\n  \"category\": \"Informatica\",\n  \"followers\": 0,\n  ...\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "API_JustClick/API_JustClick.js",
    "groupTitle": "Courses",
    "sampleRequest": [
      {
        "url": "http://localhost:8889/api/getPopolari"
      }
    ]
  }
] });

<?php
    /*$options['host'] = "localhost";   
    $options['port'] = 5984; 

    //METTERE LE PROPRIE CREDENZIALI DI COUCH DB
     //HO ABUSIVAMENTE MESSO LE CREDENZIALI MIE DI COUCH DB 
    $userDB="admin";
    $passDB="admin";

    $username= $_POST["Username"];
    $password= $_POST["Password"];
    echo $username;
    echo $password;
    //printf($username, '<a href="../views/login.html">torna indietro</a>');
    $couch = new CouchSimple($options,$userDB,$passDB);
    $resp = $couch->send("GET", "/progetto/_all_docs");
    echo $resp;


    class CouchSimple {
                
        function CouchSimple($options,$user,$password) {  
            foreach($options AS $key => $value) {  
                $this->$key = $value;  
            }
            //mio user
            $this->user=$user;
            $this->pass=$password; 
        }

        function send($method, $url, $post_data = NULL) {  
            $s = fsockopen($this->host, $this->port, $errno, $errstr);   
            if(!$s) {  
                echo "$errno: $errstr\n";   
                return false;  
            }   
            $request = "$method $url HTTP/1.0\r\nHost: $this->host\r\n"; 
              
            if ($this->user) {  
                    $request .= "Authorization: Basic ".base64_encode("$this->user:$this->pass")."\r\n";   
            }  
            if($post_data) {  
                $request .= "Content-Length: ".strlen($post_data)."\r\n\r\n";   
                $request .= "$post_data\r\n";  
            }   
            else {  
                $request .= "\r\n";  
            }  
            fwrite($s, $request);   
            $response = "";   
            while(!feof($s)) {  
                $response .= fgets($s);  
            }  
            list($this->headers, $this->body) = explode("\r\n\r\n", $response);   
            
            return $this->body;  
        }  
    } */ 
?>
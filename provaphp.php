<HTML>
    <TITLE>Esempio in PHP</TITLE>
    <HEAD></HEAD>
    <BODY> 
            <p>PROVA PHP</p>
            <?php  
            $options['host'] = "localhost";   
            $options['port'] = 5984; 

            //METTERE LE PROPRIE CREDENZIALI DI COUCH DB
             //HO ABUSIVAMENTE MESSO LE CREDENZIALI MIE DI COUCH DB 
            $user="admin";
            $password="biar";
            
            

            // Creating connection  
            $couch = new CouchSimple($options,$user,$password);   
            //$couch->send("GET", "/");   
            // Create a new database "javatpoint".  
            //$couch->send("PUT", "/javatpoint");   
            // Create a new document in the database.  
            //$couch->send("PUT", "/javatpoint/24", '{"_id":"24","name":"John"}');   
            // Fetching document  
            $resp = $couch->send("GET", "/progetto/lucarossi98");
            //$resp = $couch->send("GET", "/progetto/_all_docs");
            echo array(var_dump(json_decode($resp)));
            //echo $resp; 




            
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
            }  
            ?>
    </BODY>
</HTML> 
<!DOCTYPE html>
<html>
<head></head>
<body>
    <?php 

        if($_FILES['image']['size'] == 0 ) die("Nessuna immagine inserita");
        //accetta solo file immagine
        if($_FILES['image']['type']!="image/png" && $_FILES['image']['type']!="image/jpg" && $_FILES['image']['type']!="image/jpeg" 
            && $_FILES['image']['type']!="image/svg+xml" && $_FILES['image']['type']!="image/gif" ) 
            die("Formato dell'immagine non valido");  
        //se la dimensione dell'immagine supera 1Mb non viene accettata   
        if($_FILES['image']['size'] > 100000 ) die("Immagine troppo grande");

        $upploaddir = 'var/www/uploads';
        $user = $_POST['Username'];
        $_FILES['image']['name']= $user."_profileimage.png";
        $uploadfile = $uploaddir.basename($_FILES['image']['name']);
        
        echo "<pre>";
        if( move_uploaded_file($_FILES['image']['tmp_name'], "../img/profileImgs/$uploadfile") ) {
            echo "File is valid, and was succesfully uploaded. \n $uploadfile";
        }
        else{
            echo "Error while uploading file. \n";
        }

    ?>
</body>
</html>
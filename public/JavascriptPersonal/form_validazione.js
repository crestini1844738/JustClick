function formValidationRegister()
{
    var username = document.registration.Username;
    var name = document.registration.Name;
    var surname = document.registration.Surname;
    var date = document.registration.Date;
    var email = document.registration.Email;
    var password = document.registration.Password;
    var passwordR= document.registration.PasswordR;
    
    if(username_validation(username,6,15))
    {
        if(allLetter_name_or_surname(name,surname))
        {
            if(password_validation(password,passwordR))
            { 
                if(email_validation(email))
                {
                    return true;

                } 
            }
            
        }
    }
    return false;
}



//validazione username
function username_validation(uid,mx,my)
{
var uid_len = uid.value.length;
if (uid_len == 0 || uid_len >= my || uid_len < mx)
{
    document.getElementById("Username").focus();
$('#verifica').html("<p class='alert alert-danger mt-4'><strong>Alert!</strong>Lunghezza username "+mx+" - "+my+" </p>");
//alert("Username deve avere dai "+mx+" ai "+my+"caratteri");
//uid.focus();
return false;
}
return true;
}


//validazione password
function password_validation(passid,passidR)
{
    var exp=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if(!passid.value.match(exp))
    {
        document.getElementById("Password").focus();
        $('#verifica').html("<p class='alert alert-danger mt-4'><strong>Alert!</strong>Formato password non accettato</p>");
        //alert("La password deve avere almeno otto caratteri,una lettera maiuscola, una lettera minuscola e un numero.");
        //passid.focus();
        return false;
    }
    if(passid.value!=passidR.value)
    {
        document.getElementById("PasswordR").focus();
        $('#verifica').html("<p class='alert alert-danger mt-4'><strong>Alert!</strong>Le password non corrispondono</p>");
        
        return false;
    }
    return true;
}


//validazione nome e cognome
function allLetter_name_or_surname(name,surname)
{ 
    var letters = /^[A-Za-z]+$/;
    if(!name.value.match(letters))
    {   
        document.getElementById("Name").focus();
        $('#verifica').html("<p class='alert alert-danger mt-4'><strong>Alert!</strong> nome di soli caratteri</p>");
        //alert('Nome e cognome devono essere di soli caratteri');
        //name.focus();
        return false;
    }
    if(!surname.value.match(letters))
    {   
        document.getElementById("Surname").focus();
        $('#verifica').html("<p class='alert alert-danger mt-4'><strong>Alert!</strong> cognome di soli caratteri</p>");
        //alert('Nome e cognome devono essere di soli caratteri');
        //name.focus();
        return false;
    }
    return true;
}



//validazione email
function email_validation(uemail)
{
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(uemail.value.match(mailformat))
    {
        return true;
    }
    else
    {
        alert("Indirizzo email non valido");
        uemail.focus();
        return false;
    }
}

function formValidationLogin()
{
    return true;
}
function formValidationRegister()
{
    var username = document.registration.Username;
    var name = document.registration.Name;
    var surname = document.registration.Surname;
    var date = document.registration.Date;
    var email = document.registration.Email;
    var password = document.registration.Password;
    
    if(username_validation(username,6,15))
    {
        if(allLetter_name_or_surname(name))
        {
            if(allLetter_name_or_surname(surname))
            {
                if(password_validation(password,8,12))//la password deve avere dai 7 ai 12 caratteri
                { 
                    if(email_validation(email))
                    {
                        alert("Registrazione avvenuta con successo");
                        return true
                    } 
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
alert("Username Id should not be empty / length be between "+mx+" to "+my);
uid.focus();
return false;
}
return true;
}


//validazione password
function password_validation(passid,mx,my)
{
/*var passid_len = passid.value.length;
if (passid_len == 0 ||passid_len >= my || passid_len < mx )
{
alert("Password should not be empty / length be between "+mx+" to "+my);
passid.focus();
return false;
}
*/
    var exp=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if(!passid.value.match(exp))
    {
        alert("La password deve contenere minimo otto caratteri, almeno una lettera maiuscola, una lettera minuscola e un numero.");
        passid.focus();
        return false;
    }
    return true;
}


//validazione nome e cognome
function allLetter_name_or_surname(uname)
{ 
    var letters = /^[A-Za-z]+$/;
    if(uname.value.match(letters))
    {
        return true;
    }
    else
    {
        alert('Nome e cognome devono essere di soli caratteri');
        uname.focus();
        return false;
    }
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
        alert("You have entered an invalid email address!");
        uemail.focus();
        return false;
    }
}

function formValidationLogin()
{
    return true;
}
jQuery(document).ready(function($) {
  "use strict";

  //Contact
  $('form.contactForm').submit(function() {
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (!i.attr('checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;
    else {

        var m = "Nombre: "+$("#name").val()+" \n Correo: "+$("#email").val()+" \n Mensaje: " + $("#message").val();

        var str = {
          host: "cp2.astrahosting.com",
          puerto: "587",
          usuario: "contacto@servifix.co",
          clave: "servifix.2018",
          asunto: $("#subject").val(),
          mensaje: m,
          destinatarios: ["rcflechas@gmail.com","jhonny.jdt18@gmail.com"]
        };

      $.ajax({
        headers: { 
          Accept: 'application/json',
          'Content-Type': 'application/json' 
        },
        type: "POST",
        url: "https://enviaremail.herokuapp.com/email/masivo",
        //url: "http://localhost:8080/email/masivo",
        data: JSON.stringify(str),        
        dataType: 'json',
        //contentType: "application/json",
        //traditional: true,       
        complete: function(xhr, statusText){
          var status = xhr.status;
          if (status == 200) {
            $("#sendmessage").addClass("show");
            $("#errormessage").removeClass("show");
            $('.contactForm').find("input, textarea").val("");
          } else {
            $("#sendmessage").removeClass("show");
            $("#errormessage").addClass("show");
            $('#errormessage').html(msg);
          }
        }
      });
    } 
    return false;
  });

});

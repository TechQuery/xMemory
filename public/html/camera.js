define(['jquery'],  function ($) {

    $().iWebApp().component(function () {

        var $_Input = this.$_View.find('input[type="file"]');

        var gallery = $.GalleryView(
                this.$_View.find('ul').on(
                    'click',  'li:first-child',  $.proxy($_Input[0].click, $_Input[0])
                ),
                function ($_Item, value) {

                    if ( value )
                        $_Item.html('')[0].style.backgroundImage =
                            'url("' + value.url + '")';
                }
            ).render(['']);

        $_Input.change(function () {

            var form = this.parentElement;

            $.makeArray( this.files ).reduce(function (prev, next) {

                return  prev.then(function () {

                    return  new Promise(function (resolve, reject) {

                        var reader = new FileReader();

                        reader.onload = function () {
                            resolve( this.result );
                        };

                        reader.onerror = reader.onabort = function () {
                            reject( this.error );
                        };

                        reader.readAsDataURL( next );
                    });
                }).then(function () {

                    gallery.insert({url: arguments[0]},  1);

                    var data = new FormData();

                    data.append($_Input[0].name, next);

                    return  $.ajax(form.action, {
                        type:           form.method,
                        data:           data,
                        processData:    false,
                        contentType:    false,
                        dataType:       'text'
                    });
                });
            }, Promise.resolve(''));
        });
    });
});
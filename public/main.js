/**
 * Created with JetBrains WebStorm.
 * User: xiongsongsong
 * Date: 13-6-25
 * Time: 下午11:46
 * To change this template use File | Settings | File Templates.
 */
KISSY.use('cookie', function (S) {
    var DOM = S.DOM, Event = S.Event;
    var arr = [
        {
            pic: "1.jpg",
            url: "http://item.taobao.com/item.htm?spm=a230r.1.14.88.tIFZZK&id=17346833989"
        },
        {
            pic: "2.jpg",
            url: "http://detail.tmall.com/item.htm?spm=a230r.1.14.361.OfPLwY&id=15626085711"
        },
        {
            pic: "3.jpg",
            url: "http://item.taobao.com/item.htm?spm=a230r.1.14.247.OfPLwY&id=18925447938"
        },
        {
            pic: "4.jpg",
            url: "http://item.taobao.com/item.htm?id=17478331959&ali_refid=a3_420435_1006:1102775199:6:%C3%AB%D2%C2:1d7df9b3fe99eb6b7703ba08efe2023b&ali_trackid=1_1d7df9b3fe99eb6b7703ba08efe2023b&spm=a230r.1.18.7.OfPLwY"
        },
        {
            pic: "5.jpg",
            url: "http://item.taobao.com/item.htm?id=22135964056&ali_refid=a3_421022_1006:1105047419:6:%C3%AB%D2%C2+%BF%ED%CB%C9+%BA%AB%B0%E6+%C5%AE:f9a6b2d5e91e361638e964ed7595d150&ali_trackid=1_f9a6b2d5e91e361638e964ed7595d150&spm=1002.8.0.231.iZoloQ"
        },
        {
            pic: "6.jpg",
            url: "http://item.taobao.com/item.htm?id=22830468734&ali_trackid=2:mm_14507426_0_0:1372171609_6k3_1380792867"
        },
        {
            pic: "7.jpg",
            url: "http://detail.tmall.com/item.htm?spm=a220o.1000855.w3-8271970456.15.dbCQSG&id=17411193955&scene=taobao_shop&scene=taobao_shop"
        },
        {
            pic: "8.jpg",
            url: "http://item.taobao.com/item.htm?id=20816004676&ali_trackid=2:mm_14507426_0_0:1372171081_3k3_2020830066"
        },
        {
            pic: "9.jpg",
            url: "http://item.taobao.com/item.htm?spm=2013.1.0.174.lUbBg7&id=19133095312"
        },
        {
            pic: "10.jpg",
            url: "http://item.taobao.com/item.htm?spm=a230r.1.14.61.WJq4Uf&id=18167523626"
        },
        {
            pic: "11.jpg",
            url: "http://detail.tmall.com/item.htm?id=23899912039&ali_refid=a3_420434_1006:1105367320:6:%C3%AB%D2%C2+%C5%AE+%BA%AB%B0%E6+%BF%ED%CB%C9:830d1148b597abb1f69fae7a6bea1bf7&ali_trackid=1_830d1148b597abb1f69fae7a6bea1bf7&spm=a230r.1.17.2.WJq4Uf"
        },
        {
            pic: "12.jpg",
            url: "http://item.taobao.com/item.htm?id=15930969168&ali_trackid=2:mm_14507426_0_0:1372171617_6k2_1602831667"
        }
    ];

    var li = '';
    $(arr).each(function (index, item) {
        li += '<b id="id_' + (index + 1) + '" data-id="' + (index + 1) + '"><img src="./pic/' + item.pic + '" /></b>'
    });

    $('#toupiao').html(li);


    var max;

    var cookie_value = KISSY.Cookie.get('value');
    if (cookie_value) {
        max = parseInt(cookie_value, 10);
    }
    if (isNaN(max) && cookie_value !== 'fail') max = 6;

    if (cookie_value === 'fail') {
        $('h1').html('<h1><a class="button button-pill button-flat-primary" style="font-size: 20px">您已经选择完毕啦，谢谢您的参与，按数字 5 可以查看结果</a></h1>');
    } else {
        $('h1').html('<h1><a class="button button-pill button-flat-primary" style="font-size: 20px">请选择您喜欢的款式，最多选 ' + max + '个 </a></h1>');
    }

    if (max >= 0) {

        $('#toupiao').on('mouseenter mouseleave', 'b', function (ev) {
            var b = $(ev.currentTarget);
            if (max < 1) return;
            if (b.data('runing') === true) {
                return;
            }
            if (ev.type === 'mouseenter') {
                $(this).append('<span class="button-wrap J-button"><a class="button button-circle button-caution">喜欢</a></span>');
            } else {
                $(this).find('span.button-wrap').remove();
            }
        });

        $('#toupiao').on('click', 'span.button-wrap', function (ev) {
            var b = $(this).parents('b');
            var id = $(this).parents('b').data('id');
            b.find('span.J-button').remove();
            max--;
            KISSY.Cookie.set('value', max);
            if (max < 1) {
                KISSY.Cookie.set('value', 'fail');
                $('h1').html('<h1><a class="button button-pill button-flat-primary" style="font-size: 20px">您已经选择完毕啦，谢谢您的参与，按数字 5 可以查看结果！</a></h1>');
                return;
            }
            $('h1').html('<h1><a class="button button-pill button-flat-primary" style="font-size: 20px">您还可以选择 ' + max + '个 </a></h1>');

            b.addClass('runing');
            if (!b.data('runing')) {
                b.append($('<a class="button J-runing glow button-rounded button-flat-royal">谢谢参与</a>'))
                b.data('runing', true);
            } else {
                return;
            }


            $.get('/tongji', {
                id: id
            }, function () {
                getInfo();
            });
        });
    }
});
5
$(window).on('keypress', function (ev) {
    if (ev.keyCode === 53) {
        getInfo();
        $(document.body).addClass('show');
    } else {
        $(document.body).removeClass('show');
    }
})

function getInfo() {
    $.get('/info', {
        r: Math.random()
    }, function (docs) {
        $(docs.docs).each(function (i, item) {
            var $item = $('#' + item.id);
            $item.find('a.J-info').remove();
            $item.append($('<a  class="J-info button button-flat-primary">' + item.value + '</a>'));
        })
    });
}


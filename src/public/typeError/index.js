/**
 * @param 避免全局污染
 */

var ind = {
    page: 1,
    pageSize: 10,
    totalPage: 0,
    init: function () {
        var _this = this;
        _this.getDate();

        var options = {
            bootstrapMajorVersion: 3, //版本
            currentPage: _this.page, //当前页数
            totalPages: _this.totalPage, //总页数
            numberOfPages: 5,
            itemTexts: function (type, page) {
                switch (type) {
                    case 'first':
                        return '首页';
                    case 'prev':
                        return '上一页';
                    case 'next':
                        return '下一页';
                    case 'last':
                        return '末页';
                    case 'page':
                        return page;
                }
            },
            onPageClicked: function (event, originalEvent, type, pages) {
                _this.getDate();
            }
        };
        $('#pageUl').bootstrapPaginator(options);
    },
    /**
     *  @param { object } 获取数据
     */

    getDate: function () {

        var table, td, td1, tr, tr1, f, _this = this;

        var pages = _this.page;

        $.ajax({
            type: 'get',
            url: '/plugin/api/getHtmlError',
            data: {
                page: pages,
                pageSize: _this.pageSize,
            },
            async: false,
            success: function (data) {
                if (data.success && data.data.length) {
                    $('.title').hide();
                    tr = '', tr1 = '', td = '', td1 = '';
                    var date = data.data;
                    for (var i = 0; i < date.length; i++) {
                        var d = JSON.parse(date[i]);
                        for (var a in d) {
                            f = JSON.parse(d[a]);
                            td = '', td1 = '';
                            if (a.charAt(1) === 'r') {
                                for (var e in f) {
                                    if (e === 'sTime') {
                                        const time = new Date(f[e])
                                        f[e] = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' '
                                            + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
                                    }
                                    td += '<th>' + e + '</th>';
                                    td1 += '<td>' + f[e] + '</td>';
                                }
                                tr = '<thead><tr>' + td + '</tr></thead>';
                                tr1 += '<tr>' + td1 + '</tr>';
                            }
                        }
                    }

                    table = '<table class="table-hover">' + tr + tr1 + '</table>';

                    $('#date').html(table);

                    _this.totalPage = data.pageSize; //取到pageCount的值
                }

            },
            error: function (date) {
            
            }
        });
    }
};


$(function () {
    $('#date').html('');
    ind.init();
});
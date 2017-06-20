$app = {
    postData: function (url, callback, data, dataType, requestType) {
        if (!data) {
            data = {};
        }
        if (!dataType) {
            dataType = 'json';
        }
        if (!requestType) {
            requestType = 'POST';
        }
        var app = this;
        $.ajax({
            type: requestType,
            async: true,
            cache: false,
            url: url,
            dataType: dataType,
            data: data,
            beforeSend: function (xhr) {
                xhr.overrideMimeType("text/plain; charset=utf-8");
            },
            success: function (serverReply) {
                if (typeof callback === 'function') {
                    callback(serverReply);
                }
            },
            error: function (xhr) {
                app.showNotification("Error fetching ajax", app.notifications.ERROR);
            }, complete: function (xhr) {

            }
        });
    },

    getData: function (url, callback, data, dataType, requestType) {
        if (!data) {
            data = {};
        }
        if (!dataType) {
            dataType = 'json';
        }
        if (!requestType) {
            requestType = 'GET';
        }
        var app = this;
        $.ajax({
            type: requestType,
            async: true,
            cache: false,
            url: url,
            dataType: dataType,
            data: data,
            beforeSend: function (xhr) {
                xhr.overrideMimeType("text/plain; charset=utf-8");
            },
            success: function (serverReply) {
                if (typeof callback === 'function') {
                    callback(serverReply);
                }
            },
            error: function (xhr) {
                app.showNotification("Error fetching ajax", app.notifications.ERROR);
            }, complete: function (xhr) {

            }
        });
    }
};

$(document).ready(function () {
    var resultsPerPage = $("#resultsPerPage");
    var pagesSelect = $("#pages");
    var pageIndicator = $("#pageIndicator");
    var datacatalogContainer = $("#datacatalog");

    $("#loadCatalog").click(function () {
        $app.getData("http://api.worldbank.org/v2/datacatalog?format=json&per_page=250", function (data) {
            //console.log(data);
            
            //name,acronym,description,url,type,languagesupported,periodicity,economycoverage,granularity,numberofeconomies
            //topics,updatefrequency,updateschedule,lastrevisiondate,contactdetails,accessoption,bulkdownload,cite,detailpageurl
           //popularity,coverage,api,apiaccessurl,apisourceid,mobileapp
            
            resultsPerPage.val(data.per_page)
            pagesSelect.find('option').remove().end().append('<option>Jump to page</option>');
            for (var i = 0, max = data.pages; i < max; i++) {
                pagesSelect.append($('<option>',
                        {
                            value: (i + 1),
                            text: "Page " + (i + 1)
                        }));
            }
            pagesSelect.val(data.page);
            $(data.datacatalog).each(function (index, item) {
                console.log(item.metatype);
            });
        });
    });
});



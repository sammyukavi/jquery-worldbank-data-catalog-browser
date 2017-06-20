var resultsPerPage, resultsPerPage, pagesSelect, pageIndicator, datacatalogContainer, searchInput;
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
                console.log(xhr.responseText)
            }, complete: function (xhr) {

            }
        });
    }
};

$(document).ready(function () {
    resultsPerPage = $("#resultsPerPage");
    pagesSelect = $("#pages");
    pageIndicator = $("#pageIndicator");
    datacatalogContainer = $("#datacatalog");
    searchInput = $("#search");

    $("#loadCatalog").click(function () {
        $app.getData("http://api.worldbank.org/v2/datacatalog/metatypes/name;description?format=json&per_page=" + resultsPerPage.val() + "&page=" + pagesSelect.val(), function (data) {
            //console.log(data);
            var str = '<ul id="catalogList">';
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
                var name, description;
                name = description = "";
                if (typeof item.metatype[0] !== "undefined") {
                    name = item.metatype[0].value;
                }
                if (typeof item.metatype[1] !== "undefined") {
                    description = item.metatype[1].value;
                }
                str += '<li attr-id="' + item.id + '"><div class="title">' + name + '</div><div>' + description + '</div>\n\
<button>Filter using this catalog</button> <button>View</button> </li>';
            });
            str += "</ul>";
            datacatalogContainer.html(str);
            initCallbacks();
        });
    });


    $("#searchCatalog").click(function () {
        var search = searchInput.val();
        if (search.length < 3) {
            alert("Input stuff to search. Minimum is 3 characters");
        } else {
            $app.getData("http://api.worldbank.org/v2/datacatalog/search/" + search + "?format=json&per_page=" + resultsPerPage.val() + "&page=" + pagesSelect.val(), function (data) {
                var str = '<ul id="catalogList">';
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
                    var name, description;
                    name = description = "";
                    if (typeof item.metatype[0] !== "undefined") {
                        name = item.metatype[0].value;
                    }
                    if (typeof item.metatype[2] !== "undefined") {
                        description = item.metatype[2].value;
                    }
                    str += '<li attr-id="' + item.id + '"><div class="title">' + name + '</div><div>' + description + '</div></li>';
                });
                str += "</ul>";
                datacatalogContainer.html(str);
                initCallbacks();
            });
        }
    });
});

function initCallbacks() {
    $(".title").click(function () {
        var id = $(this).parent().attr("attr-id");
        $app.getData("http://api.worldbank.org/v2/datacatalog/" + id + "/metatypes/name;description?format=json&per_page=" + resultsPerPage.val() + "&page=" + pagesSelect.val(), function (data) {
            //console.log(data);
            var str = '<ul id="catalogList">';
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
                var name, description;
                name = description = "";
                if (typeof item.metatype[0] !== "undefined") {
                    name = item.metatype[0].value;
                }
                if (typeof item.metatype[1] !== "undefined") {
                    description = item.metatype[1].value;
                }
                str += '<li attr-id="' + item.id + '"><div class="title">' + name + '</div><div>' + description + '</div></li>';
            });
            str += "</ul>";
            datacatalogContainer.html(str);

        });
    });
}


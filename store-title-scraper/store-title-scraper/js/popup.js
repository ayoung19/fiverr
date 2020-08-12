chrome.storage.local.get("store-title-counts", function (result) {
    var map = result["store-title-counts"];
    if(map == undefined) {
        chrome.storage.local.set({ "store-title-counts": {} }, function () { });
        load_table({});
    } else {
        load_table(map);
    }
});

function load_table(map) {
    var table_headers = ["Word", "Count"];
    var columns = [
        {
            data: 'word',
            type: 'text'
        },
        {
            data: 'count',
            type: 'numeric'
        }
    ];
    var table_body = [];

    for (var word in map) {
        var table_entry = {
            "word": word,
            "count": map[word]
        }

        table_body.push(table_entry);
    }

    console.log(table_body);

    var hot_element = document.querySelector('#hot');
    var hot_settings = {
        data: table_body,
        columns: columns,
        stretchH: 'all',
        autoWrapRow: true,
        rowHeaders: true,
        colHeaders: table_headers,
        columnSorting: {
            indicator: true
        },
        autoColumnSize: {
            samplingRatio: 23
        },
        contextMenu: true,
        manualRowResize: true,
        manualColumnResize: true,
        manualRowMove: true,
        manualColumnMove: true,
        width: 700,
        height: 300
    };
    var hot = new Handsontable(hot_element, hot_settings);

    document.getElementById("export-to-csv").onclick = function () {
        var csv = toCsv(table_body);
        var download_anchor = document.createElement('a');
        download_anchor.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        download_anchor.target = '_blank';
        download_anchor.download = 'words.csv';
        download_anchor.click();
        //chrome.storage.local.set({ "store-title-counts": {} }, function () { });
    }
}

function create_li(word, count) {
    var li = document.createElement("li");
    li.innerHTML = `${word} | ${count}`;

    document.querySelector("#test").appendChild(li);
}

function toCsv(objArray, sDelimiter, cDelimiter) {
    var i, l, names = [], name, value, obj, row, output = "", n, nl;

    // Initialize default parameters.
    if (typeof (sDelimiter) === "undefined" || sDelimiter === null) {
        sDelimiter = '"';
    }
    if (typeof (cDelimiter) === "undefined" || cDelimiter === null) {
        cDelimiter = ",";
    }

    for (i = 0, l = objArray.length; i < l; i += 1) {
        // Get the names of the properties.
        obj = objArray[i];
        row = "";
        if (i === 0) {
            // Loop through the names
            for (name in obj) {
                if (obj.hasOwnProperty(name)) {
                    names.push(name);
                    row += [sDelimiter, name, sDelimiter, cDelimiter].join("");
                }
            }
            row = row.substring(0, row.length - 1);
            output += row;
        }

        output += "\n";
        row = "";
        for (n = 0, nl = names.length; n < nl; n += 1) {
            name = names[n];
            value = obj[name];
            if (n > 0) {
                row += ","
            }
            row += toCsvValue(value, '"');
        }
        output += row;
    }

    return output;
}

function toCsvValue(theValue, sDelimiter) {
    var t = typeof (theValue), output;

    if (typeof (sDelimiter) === "undefined" || sDelimiter === null) {
        sDelimiter = '"';
    }

    if (t === "undefined" || t === null) {
        output = "";
    } else if (t === "string") {
        output = sDelimiter + theValue + sDelimiter;
    } else {
        output = String(theValue);
    }

    return output;
}

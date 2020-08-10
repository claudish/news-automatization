function parseWordDocxFile(inputElement) {
    var files = inputElement.files || []
    if (!files.length) return
    var file = files[0]

    console.time()
    var reader = new FileReader()
    reader.onloadend = function(event) {
        var arrayBuffer = reader.result
        mammoth
            .convertToHtml({
                arrayBuffer: arrayBuffer
            })
            .then(function(resultObject) {
                var div = document.createElement('div')
                div.innerHTML = resultObject.value
                console.log(resultObject.value);
                var h1s = div.getElementsByTagName("h1");
                if (h1s.length === 1) {
                    h1s[0].remove();
                }

                // jak h1 jest wiecej trzeba uzyc petli
                /*var h1s = Array.from(div.getElementsByTagName("h1"));
                h1s.forEach(el => {
                  el.remove();
                })*/

                Array.from(div.querySelectorAll("h1, h2, h3")).forEach(h => {
                    if (h.childNodes.length === 2) {
                        h.childNodes[0].remove();
                    }
                })



                for (var h2 of div.getElementsByTagName("p")) {
                    var regex = /[hH]2\: {1,}/;
                    if (h2.textContent.match(regex)) {
                        var header = document.createElement("h2");
                        header.textContent = h2.textContent.replace(regex, "");
                        h2.replaceWith(header);
                    }
                }
                var links = div.getElementsByTagName("a");
                for (var aa of links) {
                    if (aa.textContent === ""); {
                        aa.remove();
                    }

                }

                var headers = Array.from(div.querySelectorAll("h2"))
                headers.forEach((header, i) => {
                    var listViewItem = document.createElement('li');
                    var a = document.createElement('a');
                    a.href = `#${++i}`;
                    a.title = header.innerHTML;
                    a.innerHTML = header.innerHTML;
                    listViewItem.appendChild(a);
                    document.getElementsByTagName("ol")[0].appendChild(listViewItem);
                    var h = document.createElement('h2');
                    var p = document.createElement('p');
                    header.id = i;
                    h.id = i++;
                })

                
            var description = div.getElementsByTagName("p"); 
          if (description.length > 0) {
         description[0].remove(); }
    

                document.getElementById("spistresci").innerHTML += div.innerHTML;
                document.getElementById("spistresci").innerHTML += "\n" + `<div class="text-center"><a href="#" class="btn btn-primary btn-lg">Sprawdź</a></div>`;
                document.getElementById("spistresci").innerHTML += "\n" + `<div class="similar-news">
        <div class="news-text-title">Polecane artykuły</div>
        <div class="simnews-items" data-news-ids="7909,8164,8119">

            <div class="w-100 d-flex my-5">
                <span class="circle-loading mx-auto"></span>
            </div>
        </div>
    </div>
`;
                spis.innerHTML = document.getElementById("spistresci").innerHTML;
                document.getElementById("spistresci").innerHTML = "";

            })


        console.timeEnd()

    }
    reader.readAsArrayBuffer(file)
}

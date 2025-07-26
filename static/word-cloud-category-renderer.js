document.addEventListener('DOMContentLoaded', function() {
  if (window.wordCloudCategoryData && document.getElementById('word-cloud-categories-container')) {
    const data = window.wordCloudCategoryData;
    const container = document.getElementById('word-cloud-categories-container');
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Puedes filtrar palabras con peso 0 si no quieres que aparezcan
    const filteredData = data.filter(d => d.weight > 0);

    // Si quieres un número máximo de palabras o un peso mínimo
    // filteredData.sort((a, b) => b.weight - a.weight);
    // const topWords = filteredData.slice(0, 50); // Muestra solo las 50 palabras más frecuentes

    const maxWeight = Math.max(...filteredData.map(d => d.weight));
    const minWeight = Math.min(...filteredData.map(d => d.weight));

    // Escala para el tamaño de la fuente
    // Ajusta el rango de tamaño de fuente según tus preferencias
    const fontSizeScale = d3.scaleLinear()
      .domain([minWeight, maxWeight])
      .range([10, 60]); // Las palabras irán de 10px a 60px

    const layout = d3.layout.cloud()
      .size([width, height])
      .words(filteredData.map(function(d) {
        return { text: d.text, size: fontSizeScale(d.weight) };
      }))
      .padding(5) // Espacio entre palabras
      .rotate(function() { return ~~(Math.random() * 2) * 90; }) // 0 o 90 grados de rotación
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", draw);

    layout.start();

    function draw(words) {
          console.log("ahora lo bueno se va a dibujar");

      d3.select("#word-cloud-categories-container").append("svg")
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1])
        .append("g")
        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) {
          // Puedes usar una escala de color de D3 para más sofisticación
          return d3.schemeCategory10[i % 10]; // Colores del esquema de D3
        })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; })
        .on("click", function(event, d) {
          // Opcional: Navegar al listado de posts para esa etiqueta/categoría
          // Asegúrate de que tu sitio tenga una URL para las taxonomías
          window.location.href = `/blog/categories/${encodeURIComponent(d.text.toLowerCase()).replace(/%20/g, '-')}/`;
        })
        .style("cursor", "pointer"); // Hace que las palabras sean clicables
    }
  }
});
export default {
  port: Number(process.env.PORT ?? 3000),
  fetch(request) {
    return new Response(
      `
      <html>
        <main>
          <img src="https://bun.sh/logo@2x.png" style="height: 48px;" alt="bun logo" />
          <h1>Benchmark (Bun On Railway)</h1>
          <h4>Rendered at: ${new Date().toISOString()}</h4>
          <h2><span>Full request to render time: <span id="overrideme" />ms</span></h2>
          <script>
            const currentTime = new Date();
            const roundTripTime = currentTime - window.performance.timing.requestStart;
            document.getElementById('overrideme').innerHTML = roundTripTime.toString() + ' ms';
            console.log('REPORTS', roundTripTime);
    
            const times = JSON.parse(localStorage.getItem('round-trip-times-store')) ?? [];
            times.push(roundTripTime);
            localStorage.setItem('round-trip-times-store', JSON.stringify(times));
            console.table(times);
          </script>
        </main>
      </html>`,
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  },
};

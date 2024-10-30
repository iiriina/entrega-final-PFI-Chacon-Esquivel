const gradientLineChartData = {
  labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // Etiquetas para todos los meses
  datasets: [
    {
      label: "Websites",
      color: "turquoise",
      data: [30, 90, 40, 140, 290, 290, 340, 230, 400], // Datos para todos los meses

    },
    {
      label: "Mobile apps",
      color: "violet",
      data: [null, null, null, null, 400, 250, 400, 230, 400], // Solo datos para los últimos 4 meses

      spanGaps: true, // Permite manejar gaps (valores null)
    },

  ],
};

export default gradientLineChartData;

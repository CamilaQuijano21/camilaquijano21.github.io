function calculateScore() {
    const scores = document.querySelectorAll('.score');
    let totalScore = 0;
    let maxScore = 0;

    // Diccionario para rastrear las puntuaciones de cada área de proceso
    const areasDeProceso = {
        "PA2.1": { nombre: "(PA2.1) Test Policy and Strategy", nivel: 2, preguntas: 0, puntuacion: 0 },
        "PA2.2": { nombre: "(PA2.2) Test Planning", nivel: 2, preguntas: 0, puntuacion: 0 },
        "PA2.3": { nombre: "(PA2.3) Test Monitoring and Control", nivel: 2, preguntas: 0, puntuacion: 0 },
        "PA2.4": { nombre: "(PA2.4) Test Design and Execution", nivel: 2, preguntas: 0, puntuacion: 0 },
        "PA2.5": { nombre: "(PA2.5) Test Environment", nivel: 2, preguntas: 0, puntuacion: 0 },
        "PA3.1": { nombre: "(PA3.1) Test Organization", nivel: 3, preguntas: 0, puntuacion: 0 },
        "PA3.2": { nombre: "(PA3.2) Test Training Program", nivel: 3, preguntas: 0, puntuacion: 0 },
        "PA3.3": { nombre: "(PA3.3) Test Lifecycle and Integration", nivel: 3, preguntas: 0, puntuacion: 0 },
        "PA3.4": { nombre: "(PA3.4) Non-Functional Testing", nivel: 3, preguntas: 0, puntuacion: 0 },
        "PA3.5": { nombre: "(PA3.5) Peer Reviews", nivel: 3, preguntas: 0, puntuacion: 0 },
        "PA4.1": { nombre: "(PA4.1) Test Measurement", nivel: 4, preguntas: 0, puntuacion: 0 },
        "PA4.2": { nombre: "(PA4.2) Product Quality Evaluation", nivel: 4, preguntas: 0, puntuacion: 0 },
        "PA4.3": { nombre: "(PA4.3) Advanced Reviews", nivel: 4, preguntas: 0, puntuacion: 0 },
        "PA5.1": { nombre: "(PA5.1) Defect Prevention", nivel: 5, preguntas: 0, puntuacion: 0 },
        "PA5.2": { nombre: "(PA5.2) Test Process Optimization", nivel: 5, preguntas: 0, puntuacion: 0 },
        "PA5.3": { nombre: "(PA5.3) Quality Control", nivel: 5, preguntas: 0, puntuacion: 0 }
    };

    scores.forEach(score => {
        const value = parseInt(score.value);
        totalScore += value;
        maxScore += 5; // Cada pregunta tiene un valor máximo de 5

        // Encontrar la etiqueta pequeña asociada con el área de proceso
        const smallTag = score.closest('.question').querySelector('.small-gray');
        if (smallTag) {
            const areaCode = smallTag.textContent.trim().match(/\((PA\d\.\d)\)/)[1];
            if (areasDeProceso[areaCode]) {
                areasDeProceso[areaCode].preguntas += 1;
                areasDeProceso[areaCode].puntuacion += value;
            }
        }
    });

    const percentage = (totalScore / maxScore) * 100;
    let level = '';
    if (percentage <= 20) {
        level = 'Nivel 1: Inicial';
    } else if (percentage <= 40) {
        level = 'Nivel 2: Managed';
    } else if (percentage <= 60) {
        level = 'Nivel 3: Defined';
    } else if (percentage <= 80) {
        level = 'Nivel 4: Measured';
    } else {
        level = 'Nivel 5: Optimization';
    }

    // Crear la tabla de resultados por área de proceso
    let areasTable = `
        <h3>Resultados por Área de Proceso</h3>
        <table>
            <tr>
                <th>Área de Proceso</th>
                <th>Nivel</th>
                <th>Cantidad de Preguntas</th>
                <th>Puntuación Obtenida</th>
                <th>Puntuación Máxima</th>
            </tr>
    `;
    for (const area in areasDeProceso) {
        const areaData = areasDeProceso[area];
        const maxAreaScore = areaData.preguntas * 5;
        areasTable += `
            <tr>
                <td>${areaData.nombre}</td>
                <td>Nivel ${areaData.nivel}</td>
                <td>${areaData.preguntas}</td>
                <td>${areaData.puntuacion}</td>
                <td>${maxAreaScore}</td>
            </tr>
        `;
    }
    areasTable += '</table>';

    // Mostrar los resultados
    document.getElementById('result').innerHTML = `
        <h2>Resultado: ${level}</h2>
        <p>Puntaje Total: ${totalScore} / ${maxScore}</p>
        <p>Porcentaje: ${percentage.toFixed(2)}%</p>
        <h3>Rúbrica de Evaluación</h3>
        <table>
            <tr>
                <th>Nivel</th>
                <th>Descripción</th>
                <th>Porcentaje</th>
            </tr>
            <tr>
                <td>Nivel 1: Inicial</td>
                <td>Procesos ad hoc y caóticos, sin procedimientos documentados.</td>
                <td>0% - 20%</td>
            </tr>
            <tr>
                <td>Nivel 2: Managed</td>
                <td>Políticas y procedimientos básicos de pruebas están implementados y gestionados.</td>
                <td>21% - 40%</td>
            </tr>
            <tr>
                <td>Nivel 3: Defined</td>
                <td>Procedimientos de pruebas estandarizados y documentados en toda la organización.</td>
                <td>41% - 60%</td>
            </tr>
            <tr>
                <td>Nivel 4: Measured</td>
                <td>Pruebas y procesos son monitorizados y controlados con métricas definidas.</td>
                <td>61% - 80%</td>
            </tr>
            <tr>
                <td>Nivel 5: Optimization</td>
                <td>Mejoras continuas basadas en datos y análisis de pruebas son implementadas.</td>
                <td>81% - 100%</td>
            </tr>
        </table>
        ${areasTable}
    `;
}

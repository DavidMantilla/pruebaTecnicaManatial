let dataEvento = [
  {
    id: 1,
    title: "Radio Lluvia",
    start: "2025-11-04T00:00",
    end: "2025-11-10T23:59",
    extendedProps: {
      registro: false,
    },
  },
  {
    id: 2,
    title: "CAMPAMENTO WARRIORS",
    start: "2025-10-03T00:00",
    end: "2025-10-07T23:59",
    extendedProps: {
      registro: true,
      data: ["Nombre", "correo", "confirmacion", "tipoDoc", "numeroDoc"],
      pago: true,
      monto: 20000,
    },
  },
  {
    title: "LEGACY TEENS",
    start: "2025-10-25T14:00",
    end: "2025-10-25T16:00",
    extendedProps: {
      registro: true,
      data: ["Nombre", "correo", "confirmacion", "tipoDoc", "numeroDoc"],
      pago: false,
    },
  },
];

let form = {
  Nombre: `<label>Nombre:</label><input type="text" id="nombre" class="registro_input" name="nombre">`,
  correo: `<label>Correo:</label><input type="email" id="correo" class="registro_input" name="Correo">`,
  confirmacion: `<label>Asistiras al evento:</label> <select class="registro_input" name="confirmacion" id="confirmacion">
            <option value="si">Si Asistire </option>
            <option value="no">No puedo asistir </option>
             </select>`,
  tipoDoc: `<label>Tipo Documento:</label><select class="registro_input" name="tipoDoc" id="tipoDoc">
            <option value="CC">Cedula de Ciudadania  </option>
            <option value="TI">Tarjeta de identidad  </option>
            <option value="CE">Cedula de Extranjeria  </option>
             </select>`,
  numeroDoc: `<label>Documento:</label><input type="text" id="doc" class="registro_input" name="doc">`,
};

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    events: dataEvento,
    eventClick: function (info) {
      const evento = info.event;

      const titulo = evento.title;
      const inicio = evento.start; // Objeto Date
      const fin = evento.end; // Objeto Date
    document.getElementById("card").style.display="block";
      const registro = evento.extendedProps.registro;
      const campos = evento.extendedProps.data;
      const pago = evento.extendedProps.pago;
      const monto = evento.extendedProps.monto;
      console.log("Título:", titulo);
      console.log("Inicio:", inicio);
      console.log("Fin:", fin);
      console.log("Registro requerido:", registro);
      console.log("Campos:", campos);
      console.log("Pago:", pago);

      let body = document.getElementById("cardBody");

      let html = `
    <h1 style="color:#000">${titulo}</h1>
  <br>
    <p style="font-weight:bold;font-size:18px">Desde:</p>
    <p>${new Date(inicio).toISOString().split("T")[0]}</p>
    ${
      new Date(inicio).getHours() != 0
        ? `<p>${new Date(inicio).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}</p>`
        : ""
    }
  <br>
    <p style="font-weight:bold;font-size:18px">Hasta:</p>
    <p>${new Date(fin).toISOString().split("T")[0]}</p>
    ${
      new Date(fin).getHours() != 23
        ? `<p>${new Date(fin).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}</p>`
        : ""
    }  
  `;

      if (registro) {
        html += `<div id="container_registro" class="Container_registro">`;
        html += `<br><h3 style="text-align:center"> Regístrate</h3>`;
        html += `<br><form class="form_registro" id="form_registro" onsubmit='Registro(event,${pago?JSON.stringify({pago:pago,monto:monto}):JSON.stringify({pago:false})})'>`;
        campos.forEach((element) => {
          html += form[element] + "<br>";
        });
        html += `<button class="button_registro">Regístrarme </button>`;
        html += `</form></div>`;
      }

      body.innerHTML = html;
    },
  });
  calendar.render();
});

function Registro(event, pago) {
  event.preventDefault();
  let form = event.target;
  console.log(form["nombre"]);

  if (!pago.pago) {
    document.getElementById(
      "container_registro"
    ).innerHTML = `<h3 style='color:#333; text-align:center'>Te has Registrado con exíto</h3> <br>
  <br>
  <div style="text-align:center;color:#555">
  <p><b>Nombre:</b> ${form["nombre"].value}</p>
  <p><b>Correo: </b>${form["correo"].value}</p>
   <p><b>confirmacion: </b>${form["confirmacion"].value}</p>
   <p><b>Tipo Documento:</b> ${form["tipoDoc"].value}</p>
     <p><b>Documento:</b> ${form["doc"].value}</p>
     </div>`;
  } else {
    let html = `<br><h3 style="text-align:center"> Realiza el Pago</h3>`;
    html += `<br><form class="form_pago" id="form_pago" onsubmit='Pago(event,${JSON.stringify({nombre:form["nombre"].value,correo:form["correo"].value,confirmacion:form["confirmacion"].value,tipoDoc:form["tipoDoc"].value,doc:form["doc"].value})})'>`;
    html += ` <label>Monto</label>
      <h3> ${pago.monto.toLocaleString("es-CO", {
       style: "currency",
       currency: "COP",
     })} 
     </h3>
     <br><br>
   <input  type="hidden" name="monto" value="${pago.monto}"/>
  <label>Método de pago</label>
  <select class="input_pago" id="metodo" required  onchange="metodoPago(this)">
    <option value="">Seleccione…</option>
    <option value="efectivo">Efectivo</option>
    <option value="tarjeta">Tarjeta</option>
    <option value="pse">PSE</option>
  </select>

  <!-- EFECTIVO -->
  <div id="box-efectivo" class="box"  style="display:none">
    <p>El pago se realizará en efectivo en recepcion o con tu lider .</p>
  </div>

  <!-- TARJETA -->
  <div id="box-tarjeta" class="box" style="display:none">
    <label>Número de tarjeta</label>
    <input class="input_pago" type="text" placeholder="0000 0000 0000 0000">

    <label>MM/YY</label>
    <input type="text" class="input_pago"  placeholder="12/28">

    <label>CVC</label>
    <input type="text" placeholder="123" class="input_pago">
  </div>

  <!-- PSE -->
  <div id="box-pse" class="box" style="display:none">
    <label>Selecciona tu banco</label>
    <select class="input_pago">
      <option value="">Seleccione…</option>
      <option>Bancolombia</option>
      <option>Davivienda</option>
      <option>Nequi</option>
      <option>BBVA</option>
    </select>

    <label>Tipo de persona</label>
    <select class="input_pago">
      <option>Natural</option>
      <option>Jurídica</option>
    </select>
  </div>

  <button type="submit" class="button_pago">Realizar Pago</button>`;

    html += "</form>";
    document.getElementById("container_registro").innerHTML = html;
  }
}

function metodoPago(select) {
  if (select.value == "efectivo") {
    document.getElementById("box-tarjeta").style.display = "none";
    document.getElementById("box-pse").style.display = "none";
    document.getElementById("box-efectivo").style.display = "block";
  }

  if (select.value == "tarjeta") {
    document.getElementById("box-tarjeta").style.display = "flex";
    document.getElementById("box-pse").style.display = "none";
    document.getElementById("box-efectivo").style.display = "none";
  }

  if (select.value == "pse") {
    document.getElementById("box-tarjeta").style.display = "none";
    document.getElementById("box-pse").style.display = "flex";
    document.getElementById("box-efectivo").style.display = "none";
  }
}

function Pago(event, personalData) {

  

  event.preventDefault();
  let form = event.target;

  let metodo = form["metodo"].value;
  if (metodo == "efectivo") {
    document.getElementById(
      "container_registro"
    ).innerHTML = `<h3 style='color:#333; text-align:center'>Te has Registrado con exíto</h3> <br> 
    <br>
    <div style="text-align:center;color:#555">
    <p><b>Nombre:</b> ${personalData.nombre}</p>
    <p><b>Correo: </b>${personalData.correo}</p>
     <p><b>confirmacion: </b>${personalData.confirmacion}</p>
     <p><b>Tipo Documento:</b> ${personalData.tipoDoc}</p>
       <p><b>Documento:</b> ${personalData.doc}</p>
       <p><b>Monto:</b> ${form["monto"].value}</p>
       <br/>
       <h3 style="color:#333; text-align:center">El pago en efectivo se realizará en recepcion o con tu lider .</h3>
       </div>`;
    return;
  }

  if (metodo == "tarjeta") {


    const campos = document.querySelectorAll("#box-tarjeta .input_pago");
    for (let c of campos) {
      if (c.value.trim() === "") {
        alert("Todos los campos de tarjeta son obligatorios");
        return;
      }
    }

    // Validación simple de tarjeta (opcional)
    if (campos[0].value.replace(/\s/g, "").length < 16) {
      alert("Número de tarjeta incompleto");
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(campos[1].value)) {
      alert("Formato de fecha inválido (MM/YY)");
      return;
    }

    if (campos[2].value.length < 3) {
      alert("CVC inválido");
      return;
    }
    document.getElementById(
      "container_registro"
    ).innerHTML = `<h3 style='color:#333; text-align:center'>procesando el pago...</h3> <br> `;
    setTimeout(() => {
      document.getElementById(
        "container_registro"
      ).innerHTML = `<h3 style='color:#333; text-align:center'>Pago Realizado con exíto</h3> <br>
      <br>
      <div style="text-align:center;color:#555">
      <p><b>Nombre:</b> ${personalData.nombre}</p>
      <p><b>Correo: </b>${personalData.correo}</p>
       <p><b>confirmacion: </b>${personalData.confirmacion}</p>
       <p><b>Tipo Documento:</b> ${personalData.tipoDoc}</p>
         <p><b>Documento:</b> ${personalData.doc}</p>
         <p><b>Monto:</b> ${form["monto"].value}</p>
          <p><b>numero Tarjeta:</b> ${campos[0].value}</p>
          <p><b>fecha:</b> ${campos[1].value}</p>
          <p><b>cvc:</b> ${campos[2].value}</p>
         </div> <br/>`;
    }, 800);
  }

  if (metodo == "pse") {
    const banco = document.querySelector("#box-pse select").value;
    if (banco === "") {
      alert("Debes seleccionar un banco");
      return;
    }
    setTimeout(() => {
      document.getElementById(
        "container_registro"
      ).innerHTML = `<h3 style='color:#333; text-align:center'>redirigiendo...</h3> <br>
      <br>
      <div style="text-align:center;color:#555">
      <p><b>Nombre:</b> ${personalData.nombre}</p>
      <p><b>Correo: </b>${personalData.correo}</p>
       <p><b>confirmacion: </b>${personalData.confirmacion}</p>
       <p><b>Tipo Documento:</b> ${personalData.tipoDoc}</p>
         <p><b>Documento:</b> ${personalData.doc}</p>
          <p><b>Banco:</b> ${banco}</p>
          <p><b>Monto:</b> ${form["monto"].value}</p>
         </div> <br/>`;
    }, 800);
  }

  console.log(form);
}

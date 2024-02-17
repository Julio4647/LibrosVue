<template>
  <div>

    <b-container>
        <input style="width:400px;" placeholder="Ingresa nombre de Libro a buscar" v-model="nombreLibro">
        <b-button style="margin:10px;" @click="buscadorNombre">Buscar</b-button>
        <input style="width:400px;" placeholder="Ingresa nombre de Autor a buscar" v-model="nombreAutor">
        <b-button style="margin:10px;" @click="buscadorAutor">Buscar</b-button> <br>
        <b-form-select style="width: 200px;" :options="generos" :value-field="'id'" :text-field="'nombre'" v-model="idGnero"></b-form-select>
        <b-button style="margin:10px;" @click="buscadorGenero">Buscar</b-button>
        <input type="number" maxlength="4" style="width:150px;" placeholder="Fecha Inicip" v-model="fechaInicio">
        <input type="number" maxlength="4" style="width:150px;" placeholder="Fecha Final" v-model="fechafin">
        <b-button style="margin:10px;" @click="buscadorFecha">Buscar</b-button>
        <b-button style="margin:10px;" @click="buscadorFechaDesc">Buscar de Manera Descendiente</b-button>
    </b-container>  
    <br>

    <b-button @click="mostrarModal" style="margin-left: 1000px; background-color:green">Añadir Libro</b-button>

    <b-modal ref="modal-1" title="Libro" hide-footer hide-header>
      <form @submit.prevent="guardarLibro">
        <label for="anio">Año:</label>
        <b-form-input v-model="nuevoLibro.anio" required></b-form-input>

        <label for="autor">Autor:</label>
        <b-form-input v-model="nuevoLibro.autor" required></b-form-input>

        <label for="nombre">Nombre del Libro:</label>
        <b-form-input v-model="nuevoLibro.nombre"></b-form-input>

        <label for="genero">Genero:</label>

        <b-form-select v-model="nuevoLibro.genero" :options="generos" :value-field="'id'" :text-field="'nombre'" required></b-form-select>

        <br>   

        <b-button variant="outline-secondary" @click="cerrarModal">Cerrar</b-button>
        <b-button variant="primary" @click="agregarLibroModal">OK</b-button>
      </form>
    </b-modal>

    <b-row>
      <b-col v-for="(libro, index) in libros" :key="index" cols="12" sm="6" md="4" lg="3" xl="2">
        <b-card :title="libro.nombre" :img-src="`https://picsum.photos/600/300/?image=${index}`" img-alt="Image" img-top
          tag="article" style="max-width: 20rem;" class="mb-2">
          <b-card-text>
            {{ libro.nombre }}<br>
            Año: {{ libro.anio }}<br>
            Categoría: {{ libro.genero.nombre }}<br>
            Autor: {{ libro.autor }}
          </b-card-text>
          <b-button @click="editarLibro(index)" variant="primary">Editar</b-button>
          <b-button @click="eliminarLibro(index)" variant="danger">Eliminar</b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nuevoLibro: { anio: 0, autor: '', nombre: '', genero: '' },
      libroEditandoIndex: null,
      nombreLibro: '',
      nombreAutor: '',
      fechaInicio:'',
      fechafin:'',
      idGnero: '',
      libros: [],
      generos:[],
      categorias: [1, 2, 3]
    };
  },
  methods: {
    buscadorNombre(){
      fetch(`http://localhost:8080/api/libreria/libro/name/${this.nombreLibro}`)
        .then(response => response.json())
        .then(data => {
          this.libros = data.data;

        })
        .catch(error => {
          console.error('Error al obtener libros:', error);
        });
    },
    buscadorAutor(){
      fetch(`http://localhost:8080/api/libreria/libro/autor/${this.nombreAutor}`)
        .then(response => response.json())
        .then(data => {
          this.libros = data.data;

        })
        .catch(error => {
          console.error('Error al obtener libros:', error);
        });
    },
    buscadorGenero(){
      fetch(`http://localhost:8080/api/libreria/libro/genero/${this.idGnero}`)
        .then(response => response.json())
        .then(data => {
          this.libros = data.data;

        })
        .catch(error => {
          console.error('Error al obtener libros:', error);
        });
    },
    buscadorFecha(){
      fetch(`http://localhost:8080/api/libreria/libro/anio/${this.fechaInicio}/${this.fechafin}`)
        .then(response => response.json())
        .then(data => {
          this.libros = data.data;

        })
        .catch(error => {
          console.error('Error al obtener libros:', error);
        });
    },
    buscadorFechaDesc(){
      fetch(`http://localhost:8080/api/libreria/libro/anio/desc/`)
        .then(response => response.json())
        .then(data => {
          this.libros = data.data;

        })
        .catch(error => {
          console.error('Error al obtener libros:', error);
        });
    },

    mostrarModal() {
      this.$refs['modal-1'].show();
    },

    cerrarModal() {
      this.nuevoLibro = { anio: '', autor: '', nombre: '', genero: '' };
      this.libroEditandoIndex = null;
      this.$refs['modal-1'].hide();
    },

    getAllLibros() {
      fetch('http://localhost:8080/api/libreria/libro/')
        .then(response => response.json())
        .then(data => {
          this.libros = data.data;

        })
        .catch(error => {
          console.error('Error al obtener libros:', error);
        });
    },
    getAllGeneros() {
      fetch('http://localhost:8080/api/libreria/genero/')
        .then(response => response.json())
        .then(data => {
          this.generos = data.data;
          console.log(data)

        })
        .catch(error => {
          console.error('Error al obtener libros:', error);
        });
    },

    createLibro(libro) {

      const url ="http://localhost:8080/api/libreria/libro/";
        const jsonData = {
          nombre: libro.nombre,
          autor:libro.autor,
          anio: libro.anio,
          genero: {id:libro.genero}
        } 
        const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
          body: JSON.stringify(jsonData)
        } 

        fetch(url, options)
        .then(response => {  
          if (response.ok) {
            return response.json(); // Devuelve los datos en formato JSON
            this.cerrarModal();
          }
          throw new Error('Error en la solicitud POST');
        })
        .then(data => {
          console.log('Respuesta:', data);
        })
        .catch(error => {
          console.error('Error:', error);

        });

    },

    updateLibro(libro) {
      fetch('http://localhost:8080/api-crudvueback/libro/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ libro }),
      })
        .then(response => response.json())
        .then(data => {
          this.libros[this.libroEditandoIndex] = data.data;
          this.cerrarModal();
        })
        .catch(error => {
          console.error('Error al actualizar libro:', error);
        });
    },

    deleteLibro(id) {
      fetch(`http://localhost:8080/api/libreria/libro/${id}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(() => {
          this.libros.splice(this.libroEditandoIndex, 1);
          this.cerrarModal();
        })
        .catch(error => {
          console.error('Error al eliminar libro:', error);
        });
    },

    guardarLibro() {
      if (this.libroEditandoIndex !== null) {
        this.updateLibro(this.nuevoLibro);
      } else {
        this.createLibro(this.nuevoLibro);
      }
    },

    agregarLibroModal() {
      this.createLibro(this.nuevoLibro);
    },
    editarLibro(index) {
      const libroSeleccionado = this.libros[index];

      if (libroSeleccionado) {
        this.nuevoLibro = {
          anio: libroSeleccionado.anio || '',
          autor: libroSeleccionado.autor || '',
          nombre: libroSeleccionado.nombre || '',
          genero: libroSeleccionado.genero || ''
        };
        this.libroEditandoIndex = index;
        this.mostrarModal();
      }
    },

    eliminarLibro(index) {
      const id = this.libros[index].id;
      this.deleteLibro(id);
    },
  },
  mounted() {
    this.getAllLibros();
    this.getAllGeneros();
  }
};
</script>

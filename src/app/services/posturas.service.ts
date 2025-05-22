import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, setDoc, doc } from '@angular/fire/firestore';
import { PosturaI, Dificultad } from '../models/postura.models';
import { FirestoreService } from './firestore.service'; // Importamos el servicio FirestoreService
import { getDocs } from 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class PosturasService {
  constructor(private firestore: Firestore, private firestoreService: FirestoreService) {}

  
  // Método para obtener las posturas desde Firestore devuelve un array DocumentData
  async getPosturas() {
    const posturasCollection = collection(this.firestore, 'posturas'); //Obtenemos referencia la la colección de posturas
    const querySnapshot = await getDocs(posturasCollection); //Obtenemos los documentos de la colección
    const posturas = querySnapshot.docs.map((doc) => doc.data()); //De esos documentos obtenemos los datos y los guardamos en un array
    return posturas;
  }

  async addPosturas() {
    const posturas: PosturaI[] = [
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/03/tadasana-samasthiti.jpg",
          "postura": "Tadasana o Samasthiti – Postura de la montaña",
          "video": "https://www.youtube.com/watch?v=27wklcKtPuw",
          "duracion": 1,
          "dificultad": Dificultad.Facil,
          "categoria_id": 1
      },
      {
          "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/03/urdhva-hastasana-mano-arriba.jpg",
          "postura": "Urdhva Hastasana – Postura de mano hacia arriba",
          "video": "https://www.youtube.com/watch?v=6JCj40FKdVk",
          "duracion": 1,
          "dificultad": Dificultad.Facil,
          "categoria_id": 1
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2021/05/uttanasana.jpeg",
          "postura": "Uttanasana – Postura de la pinza de pie",
          "video": "https://www.youtube.com/watch?v=HDRncCgsqq0",
          "duracion": 1,
          "dificultad": Dificultad.Facil,
          "categoria_id": 3
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/03/ardha-uttanasana.jpg",
          "postura": "Ardha Uttanasana – Postura de la media flexión hacia adelante",
          "video": "https://www.youtube.com/watch?v=3G4bzeV23VU",
          "duracion": 1,
          "dificultad": Dificultad.Facil,
          "categoria_id": 3
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/03/adho-mukha-svanasana-perro-boca-abajo.jpg",
          "postura": "Adho mukha svanasana – perro boca abajo",
          "video": "https://www.youtube.com/watch?v=G74sC-56ops",
          "duracion": 3,
          "dificultad": Dificultad.Media,
          "categoria_id": 1
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/03/utkatasana-garudasana-silla-aguila.jpg",
          "postura": "Utkatasana – Postura de la silla",
          "video": "https://www.youtube.com/watch?v=iAclKRoyOjU",
          "duracion": 1,
          "dificultad": Dificultad.Media,
          "categoria_id": 1
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/03/virabhadrasana-guerrero-1.jpg",
          "postura": "Virabhadrasana I – Postura del guerrero 1",
          "video": "https://www.youtube.com/watch?v=i1PD4cj69oQ",
          "duracion": 2,
          "dificultad": Dificultad.Media,
          "categoria_id": 1
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/03/virabhadrasana-II-guerrero-2.jpg",
          "postura": "Virabhadrasana II – Postura del guerrero 2",
          "video": "",
          "duracion": 2,
          "dificultad": Dificultad.Media,
          "categoria_id": 1
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2021/09/virabhadrasana-III.jpeg",
          "postura": "Virabhadrasana III – Postura del guerrero 3",
          "video": "https://www.youtube.com/watch?v=-8hKpr5dxFM",
          "duracion": 2,
          "dificultad": Dificultad.Media,
          "categoria_id": 2
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2021/05/padangusthasana-beneficios.jpg",
          "postura": "Padangusthasana – mano a dedo gordo",
          "video": "",
          "duracion": 1,
          "dificultad": Dificultad.Facil,
          "categoria_id": 1
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2021/05/yoga-padahastasana.jpg",
          "postura": "Padahastasana – mano hasta pie",
          "video": "https://www.youtube.com/watch?v=lXmaLiRtZMI",
          "duracion": 1,
          "dificultad": Dificultad.Facil,
          "categoria_id": 1
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/anjaneyasana-luna-creciente.jpeg",
          "postura": "Anjaneyasana – Postura de luna creciente",
          "video": "https://www.youtube.com/watch?v=4-ek61i_IWU",
          "duracion": 2,
          "dificultad": Dificultad.Media,
          "categoria_id": 1
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/anjaneyasana-corredor-ascendiente.jpeg",
          "postura": "Anjaneyasana – postura de corredor ascendiente",
          "video": "https://www.youtube.com/watch?v=TN5ptZ-scGg",
          "duracion": 3,
          "dificultad": Dificultad.Media,
          "categoria_id": 1
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/utthita-trikonasana.jpg",
          "postura": "Utthita trikonasana – Postura del triángulo extendido",
          "video": "https://www.youtube.com/watch?v=ifHE6wsw3TA",
          "duracion": 2,
          "dificultad": Dificultad.Media,
          "categoria_id": 1
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/03/utthita-parsvakonasana-angulo-lateral-extendido.jpg",
          "postura": "Utthita parsvakonasana – Ángulo lateral extendido",
          "video": "https://www.youtube.com/watch?v=EvfTyyMIlFo",
          "duracion": 2,
          "dificultad": Dificultad.Media,
          "categoria_id": 1
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/03/parivrtta-parsvakonasana-angulo-lateral-torsion.jpg",
          "postura": "Parivrtta parsvakonasana – Ángulo lateral en torsion(también es una postura de torsión)",
          "video": "https://www.youtube.com/watch?v=B9lQA-74d_Q",
          "duracion": 2,
          "dificultad": Dificultad.Media,
          "categoria_id": 1
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/03/ardha-chandrasana-media-luna.jpg",
          "postura": "Ardha chandrasana – Media luna",
          "video": "https://www.youtube.com/watch?v=8vROKGeU8e0",
          "duracion": 2,
          "dificultad": Dificultad.Media,
          "categoria_id": 2
      },
      {"id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/03/parsvottanasana-piramide.jpg",
          "postura": "Parsvottanasana – Postura de la pirámide",
          "video": "https://www.youtube.com/watch?v=cWNfuhwpQEI",
          "duracion": 2,
          "dificultad": Dificultad.Media,
          "categoria_id": 2
      },
      { "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/03/vrksasana-postura-arbol.jpg",
          "postura": "Vrksasana – Postura del árbol",
          "video": "https://www.youtube.com/watch?v=H3TfAT-VLFQ",
          "duracion": 2,
          "dificultad": Dificultad.Media,
          "categoria_id": 2
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/03/garudasana-aguila.jpg",
          "postura": "Garudasana – Postura del águila",
          "video": "https://www.youtube.com/watch?v=Dp4r4V48cmw",
          "duracion": 2,
          "dificultad": Dificultad.Media,
          "categoria_id": 2
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/03/prasarita-padottanasana-a-b-c-d.jpg",
          "postura": "Prasarita padottanasana – Estiramiento con las piernas separadas: a, b, c y d",
          "video": "https://www.youtube.com/watch?v=qeScpoH19CQ",
          "duracion": 2,
          "dificultad": Dificultad.Media,
          "categoria_id": 1
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/03/vasisthasana-plancha-lateral.jpg",
          "postura": "Vasisthasana – Plancha lateral",
          "video": "https://www.youtube.com/watch?v=PhS7iy--i00",
          "duracion": 3,
          "dificultad": Dificultad.Media,
          "categoria_id": 2
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/03/urdhva-prasarita-ekapadasana-standing-split.jpg",
          "postura": "Urdhva prasarita ekapadasana – Standing split – Pie arriba extendido",
          "video": "",
          "duracion": 2,
          "dificultad": Dificultad.Media ,
          "categoria_id": 2
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/03/svarga-dvidasana-ave-del-paraiso.jpg",
          "postura": "Svarga dvidasana – Ave del paraíso",
          "video": "https://www.youtube.com/watch?v=cqZUJP9KNuc",
          "duracion": 2,
          "dificultad": Dificultad.Media,
          "categoria_id": 2
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/03/natarajasana-postura-del-bailarin.jpg",
          "postura": "Natarajasana – Postura del bailarin (también es una postura de extensión / backbends)",
          "video": "https://www.youtube.com/watch?v=8LtXpuPNnSc",
          "duracion": 2,
          "dificultad": Dificultad.Media,
          "categoria_id": 2
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/tithibasana-B.jpg",
          "postura": "Tithibasana B (también es una postura de apertura de caderas)",
          "video": "https://www.youtube.com/watch?v=8K0ghCn8O_E",
          "duracion": 2,
          "dificultad": Dificultad.Media,
          "categoria_id": 1
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/sukhasana-postura-facil.jpg",
          "postura": "Sukhasana – postura fácil",
          "video": "https://www.youtube.com/watch?v=U67ESke7kYo",
          "duracion": 1,
          "dificultad": Dificultad.Facil,
          "categoria_id": 8
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/padmasana-postura-del-loto.jpg",
          "postura": "Padmasana – postura del loto",
          "video": "https://www.youtube.com/watch?v=Ny0M5XfQMJg",
          "duracion": 2,
          "dificultad": Dificultad.Media,
          "categoria_id": 8
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/dandasana-postura-del-baston.jpg",
          "postura": "Dandasana – postura del bastón",
          "video": "https://www.youtube.com/watch?v=fdnV0uvXoBc",
          "duracion": 1,
          "dificultad": Dificultad.Facil,
          "categoria_id": 8
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/paschimottanasana-pinza-sentada.jpg",
          "postura": "Paschimottanasana – pinza sentada",
          "video": "https://www.youtube.com/watch?v=e_JB0If_aLU",
          "duracion": 2,
          "dificultad": Dificultad.Media,
          "categoria_id": 8
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2020/06/Arda-badha-padma-paschimottanasana-large.jpeg",
          "postura": "Ardha Baddha Padma Paschimottanasana",
          "video": "https://www.youtube.com/watch?v=AVUVV0B6c-g",
          "duracion": 1,
          "dificultad": Dificultad.Media,
          "categoria_id": 8
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2020/06/Triang-muka-eka-pada-paschimottanasana-large.jpeg",
          "postura": "Triang Muka Eka Pada Paschimottanasana",
          "video": "https://www.youtube.com/watch?v=4HC0gq_FTHA",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 8
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/janu-sirsasana-a-b-c.jpg",
          "postura": "Janu Sirsasana A, B, C – Postura de la cabeza a la rodilla",
          "video": "https://www.youtube.com/watch?v=eY2FxIY1XLE",
          "duracion": 1,
          "dificultad": Dificultad.Media,
          "categoria_id": 8
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/marichyasana-a-b.jpg",
          "postura": "Marichyasana A y B – Postura de Mariachi o Rayo de Luz",
          "video": "https://www.youtube.com/watch?v=-WGXF9_vaAM",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 8
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/paripurna-navasana-postura-del-barco.jpg",
          "postura": "Paripurna Navasana – Postura del Barco",
          "video": "https://www.youtube.com/watch?v=GMWN4-n0pt4",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 8
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/baddha-konasana-mariposa.jpg",
          "postura": "Baddha Konasana – Mariposa",
          "video": "https://www.youtube.com/watch?v=kfMvTtByPlQ",
          "duracion": 2,
          "dificultad": Dificultad.Facil,
          "categoria_id": 8
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/upavistha-konasana-angulo-sentado.jpg",
          "postura": "Upavistha Konasana A y B – Ángulo Sentado",
          "video": "https://www.youtube.com/watch?v=z-V1jIv16hc",
          "duracion": 2,
          "dificultad": Dificultad.Media,
          "categoria_id": 8
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/hamunasana-yoga.jpg",
          "postura": "Hanumanasana – Postura del Espagat o del Mono",
          "video": "https://www.youtube.com/watch?v=Vr-cljplKww",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 8
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/virasana-postura-del-heroe.jpg",
          "postura": "Virasana – Postura del Héroe",
          "video": "https://www.youtube.com/watch?v=0C3WP-gtVQE",
          "duracion": 2,
          "dificultad": Dificultad.Facil,
          "categoria_id": 8
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/supta-virasana-heroe-reclinado.jpg",
          "postura": "Supta Virasana – Postura del Héroe Reclinado",
          "video": "https://www.youtube.com/watch?v=GUO8s4d1slA",
          "duracion": 2,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 8
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/preparacion-eka-pada-raja-kapotasana-1.jpg",
          "postura": "Preparación Eka Pada Raja Kapotasana – Preparación Postura Paloma",
          "video": "https://www.youtube.com/watch?v=L5BuvGP3fPs",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 8
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/agnistambhasana-paloma-doble.jpg",
          "postura": "Parivrtta Agnistambhasana – Paloma Doble (También es Postura de Torsión)",
          "video": "https://www.youtube.com/watch?v=Zi_tOrTtw1g",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 8
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/utthan-pristhasana-postura-del-lagarto.jpg",
          "postura": "Utthan Pristhasana – Postura del Lagarto",
          "video": "https://www.youtube.com/watch?v=1QhsbJc5-mE",
          "duracion": 1,
          "dificultad": Dificultad.Media,
          "categoria_id": 8
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/malasana-cuclillas.jpg",
          "postura": "Malasana – Postura del Indio",
          "video": "https://www.youtube.com/watch?v=dzKtaYcIotU",
          "duracion": 3,
          "dificultad": Dificultad.Facil,
          "categoria_id": 8
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/parighasana-postura-puerta-1.jpg",
          "postura": "Parighasana – Postura de la Puerta",
          "video": "https://www.youtube.com/watch?v=I82R1YJl_f4",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 8
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/skandasana-dios-guerra.jpg",
          "postura": "Skandasana – Postura del Dios de la Guerra o Surfers Lunge",
          "video": "https://www.youtube.com/watch?v=vK-3L2EHh_k",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 8
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/ubhaya-padangusthasana.jpg",
          "postura": "Ubhaya Padangusthasana – Mano a Ambos Dedos Gordos",
          "video": "https://www.youtube.com/watch?v=t2e7dm_oHck",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 8
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/kurmasana-postura-tortuga.jpg",
          "postura": "Kurmasana – Postura de la Tortuga",
          "video": "https://www.youtube.com/watch?v=S5dglhQXz_U",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 8
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/garbha-pindasana-postura-feto.jpg",
          "postura": "Garbha Pindasana – Postura del Feto",
          "video": "https://www.youtube.com/watch?v=RaVEV053eH0",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 8
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/ardha-baddha-padmottanasana.jpg",
          "postura": "Ardha Baddha Padmottanasana – Flexión Loto Medio Hacia Adelante",
          "video": "",
          "duracion": 2,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 8
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/krounchasana-postura-garza-grulla.jpg",
          "postura": "Krounchasana – Postura de la Garza o Grulla",
          "video": "https://www.youtube.com/watch?v=LRAESmywW0k",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 8
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/vatayanasana-postura-del-caballo.jpg",
          "postura": "Vatayanasana – Postura del Caballo",
          "video": "https://www.youtube.com/watch?v=3cYiDpPLXlg",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 8
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2020/06/Cara-de-vaca-gomukhasana-large.jpeg",
          "postura": "Gomukhasana – Cara de Vaca",
          "video": "https://www.youtube.com/watch?v=6_ZXkW3WAP4",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 8
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/bhujangasana-cobra.jpg",
          "postura": "Bhujangasana – Postura de la cobra",
          "video": "https://www.youtube.com/watch?v=9Wp4DGMjRm0",
          "duracion": 1,
          "dificultad": Dificultad.Facil,
          "categoria_id": 4
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/urdhva-mukha-svanasana-perro-boca-arriba.jpg",
          "postura": "Urdhva mukha svanasana – perro boca arriba",
          "video": "https://www.youtube.com/watch?v=L57v0Lq9EcM",
          "duracion": 1,
          "dificultad": Dificultad.Facil,
          "categoria_id": 4
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/salabhasana-langosta-saltamontes.jpg",
          "postura": "Salabhasana – postura de la langosta o saltamontes",
          "video": "https://www.youtube.com/watch?v=dBXi-zaRwAI",
          "duracion": 1,
          "dificultad": Dificultad.Media,
          "categoria_id": 4
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/dhanurasana-postura-del-arco.jpg",
          "postura": "Dhanurasana – postura del arco",
          "video": "https://www.youtube.com/watch?v=c4xTHERsr7Q",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 4
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/matsyasana.jpg",
          "postura": "Matsyasana – postura del pez",
          "video": "https://www.youtube.com/watch?v=rdgoCgdrEoU",
          "duracion": 1,
          "dificultad": Dificultad.Facil,
          "categoria_id": 4
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/setu-bandha-sarvangasana-postura-medio-puente.jpg",
          "postura": "Setu bandha sarvangasana – postura del medio puente",
          "video": "https://www.youtube.com/watch?v=1BwwbvgaeV4",
          "duracion": 1,
          "dificultad": Dificultad.Facil,
          "categoria_id": 4
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/urdhva-dhanurasana-postura-del-puente.jpg",
          "postura": "Urdhva dhanurasana – postura del puente",
          "video": "https://www.youtube.com/watch?v=tNKWp2S3En4",
          "duracion": 2,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 4
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/ustrasana-postura-del-camello.jpg",
          "postura": "Ustrasana – postura del camello",
          "video": "https://www.youtube.com/watch?v=vlNLJ-mVWHM",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 4
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/camatkarasana.jpg",
          "postura": "Camatkarasana -­postura salvaje",
          "video": "https://www.youtube.com/watch?v=0IKWaTBkGfU",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 4
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/eka-pada-rajakapotasana-postura-paloma.jpg",
          "postura": "Eka pada rajakapotasana – postura de la paloma",
          "video": "https://www.youtube.com/watch?v=b_FPLGeUcSc",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 4
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/03/natarajasana-postura-del-bailarin.jpg",
          "postura": "Natarajasana – Postura del bailarin (también es una postura de extensión / backbends)",
          "video": "https://www.youtube.com/watch?v=8LtXpuPNnSc",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 4
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/kapotasana.jpg",
          "postura": "Kapotasana",
          "video": "https://www.youtube.com/watch?v=csuTRPftR4I",
          "duracion": 2,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 4
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/03/parivritta-trikonasana-triangulo-torsion.jpg",
          "postura": "Parivrtta trikonasana – Postura del triángulo en torsion (también es una postura de pie)",
          "video": "https://www.youtube.com/watch?v=V00SS-_Wcr0",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 7
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/agnistambhasana-paloma-doble.jpg",
          "postura": "Parivrtta Agnistambhasana – paloma doble (también es postura de torsión)",
          "video": "https://www.youtube.com/watch?v=r3oXBEd4YpY",
          "duracion": 1,
          "dificultad": Dificultad.Dificil ,
          "categoria_id": 7
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/jathara-parivrtta.jpg",
          "postura": "Jathara parivrtta – postura del abdomen girado",
          "video": "https://www.youtube.com/watch?v=z1pfUgDrHVU",
          "duracion": 1,
          "dificultad": Dificultad.Media,
          "categoria_id": 7
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/ardha-matsyendrasana.jpg",
          "postura": "Ardha matsyendrasana – postura del señor de los peces",
          "video": "https://www.youtube.com/watch?v=GKEtI-YALKQ",
          "duracion": 1,
          "dificultad": Dificultad.Media,
          "categoria_id": 7
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/Bharadvajasana-postura-bharadvaja.jpg",
          "postura": "Bharadvajasana – postura de bharadvaja",
          "video": "https://www.youtube.com/watch?v=aIiMquPfrL4",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 7
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/Marichyasana-c.jpg",
          "postura": "Marichyasana c – postura de mariachi c",
          "video": "https://www.youtube.com/watch?v=EznA6OXk0-4",
          "duracion": 1,
          "dificultad": Dificultad.Dificil ,
          "categoria_id": 7
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/parsva-bakasana-cuervo-lateral.jpg",
          "postura": "Parsva bakasana – postura del cuervo lateral (también es una postura de equilibrio sobre manos)",
          "video": "https://www.youtube.com/watch?v=Ly_0HT2J6DQ",
          "duracion": 1,
          "dificultad": Dificultad.Dificil ,
          "categoria_id": 7
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/eka-pada-koundinyasana-I-splits-voladores-1.jpg",
          "postura": "Eka pada koundinyasana I – postura de splits voladores 1",
          "video": "https://www.youtube.com/watch?v=7NARxE1ivU4",
          "duracion": 2,
          "dificultad": Dificultad.Dificil ,
          "categoria_id": 7
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/03/chaturanga-dandasana-plancha.jpg",
          "postura": "Chaturanga Dandasana – Plancha",
          "video": "https://www.youtube.com/watch?v=NyCA2_tnxzY",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 6
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/03/utthita-chaturanga-dandasana.jpg",
          "postura": "Utthita Chaturanga Dandasana – Plancha extendida",
          "video": "https://www.youtube.com/watch?v=9fxH74UwA7s",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 6
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2021/05/kakasana-yoga.jpg",
          "postura": "Kakasana – postura del cuervo con rodillas a los lados de las codos",
          "video": "https://www.youtube.com/watch?v=SevyFSshg9A",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 6
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/bakasana-cuervo-axilas.jpg",
          "postura": "Bakasana – postura del cuervo con rodillas cerca de las axilas",
          "video": "https://www.youtube.com/watch?v=3tKCo7fcs6Q",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 6
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/parsva-bakasana-cuervo-lateral.jpg",
          "postura": "Parsva bakasana – postura del cuervo lateral (también es una postura de equilibrio sobre manos)",
          "video": "https://www.youtube.com/watch?v=Ly_0HT2J6DQ",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 6
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/eka-pada-galavasana.jpg",
          "postura": "Eka pada galavasana – postura de galava, viejo sabio",
          "video": "https://www.youtube.com/watch?v=tJYU42NJPlY",
          "duracion": 2,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 6
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/eka-pada-koundinyasana-I-splits-voladores-1.jpg",
          "postura": "Eka pada koundinyasana I – postura de splits voladores 1",
          "video": "https://www.youtube.com/watch?v=7NARxE1ivU4",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 6
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/eka-pada-koundinyasana-II-splits-voladores-2.jpg",
          "postura": "Eka Pada Koundinyasana II – Postura de splits voladores 2",
          "video": "https://www.youtube.com/watch?v=YExZpxFpKns",
          "duracion": 2,
          "dificultad": Dificultad.Dificil ,
          "categoria_id": 6
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2020/06/8-angulos-astavakrasana-large.jpeg",
          "postura": "Astavakrasana – 8 ángulos",
          "video": "https://www.youtube.com/watch?v=BheNJQyiOZk",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 6
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/tithibasana-A.jpg",
          "postura": "tithibasana A",
          "video": "https://www.youtube.com/watch?v=j-sHDVcV6to",
          "duracion": 2,
          "dificultad": Dificultad.Media,
          "categoria_id": 6
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/salamba-sarvangasana-postura-de-la-vela.jpg",
          "postura": "Salamba sarvangasana – postura de la vela o sobre los hombros (reina de las posturas)",
          "video": "https://www.youtube.com/watch?v=Bq_nta7qqGA",
          "duracion": 4,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 5
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/halasana-postura-del-arado.jpg",
          "postura": "Halasana – postura del arado",
          "video": "https://www.youtube.com/watch?v=btd65FhJ6bU",
          "duracion": 3,
          "dificultad": Dificultad.Media,
          "categoria_id": 5
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/urdvha-padmasana.jpg",
          "postura": "Urdvha Padmasana",
          "video": "https://www.youtube.com/watch?v=uK1X-MrfPa4",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 5
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/pindasana.jpg",
          "postura": "Pindasana",
          "video": "https://www.youtube.com/watch?v=RaVEV053eH0",
          "duracion": 3,
          "dificultad": Dificultad.Media,
          "categoria_id": 5
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/tripode-headstand.jpeg",
          "postura": "Tripode HeadStand",
          "video": "https://www.youtube.com/watch?v=aKfFupH5GSY",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 5
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/sirsasana.jpeg",
          "postura": "Sirsasana – postura sobre la cabeza (rey/padre de las posturas)",
          "video": "https://www.youtube.com/watch?v=5IadVo8uans",
          "duracion": 2,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 5
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/pincha-mayurasana.jpg",
          "postura": "Pincha mayurasana – postura de equilibrio sobre los antebrazos",
          "video": "https://www.youtube.com/watch?v=59BofGqrqHc",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 5
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/escorpion.jpg",
          "postura": "Vrschikasana – Escorpión",
          "video": "https://www.youtube.com/watch?v=5ncRFXulRDw",
          "duracion": 2,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 5
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/adho-mukha-vrksasana-pino-handstand.jpg",
          "postura": "Adho mukha vrksasana – Postura del pino o Handstand",
          "video": "https://www.youtube.com/watch?v=U8Xn18CSb6w",
          "duracion": 1,
          "dificultad": Dificultad.Dificil,
          "categoria_id": 5
      },
      {
        "id": "",
          "imagen": "https://www.theclassyoga.com/wp-content/uploads/2024/04/savasana-yoga.jpg",
          "postura": "Savasana",
          "video": "https://www.youtube.com/watch?v=ABZtPSFg5g8",
          "duracion": 5,
          "dificultad": Dificultad.Facil,
          "categoria_id": 9
      }
  ];

  try {
    const coleccionPosturas = collection(this.firestore, 'posturas'); //Obtenemos la referencia la colacción de posturas
    const posturasSnapshot = await getDocs(coleccionPosturas); //Obtenemos una snapshot con los documentos de esa colección
    const idsExistentes = posturasSnapshot.docs.map((doc) => doc.id);
  
    for (const postura of posturas) { //Vamos recorriendo el array de posturas
      
      // Crear una referencia con ID generado automáticamente
      const nuevoDocumentoRef = doc(coleccionPosturas);
  
      // Verificar que no exista ya una postura con el mismo nombre
      const yaExiste = posturasSnapshot.docs.some(doc => (doc.data() as PosturaI).postura === postura.postura);

  
      if (!yaExiste) { //si la postura no existe
        await setDoc(nuevoDocumentoRef, {
          id: nuevoDocumentoRef.id, // Guardamos el ID generado dentro del documento
          imagen: postura.imagen,
          postura: postura.postura,
          video: postura.video,
          duracion: postura.duracion,
          dificultad: postura.dificultad,
          categoria_id: postura.categoria_id
        });
        console.log(`Postura ${postura.postura} añadida.`);
      } 
      else {
        console.log(`La postura "${postura.postura}" ya existe.`);
      }
    }
  } catch (error: unknown) {
    console.error("Error al insertar las posturas en Firestore", error);
  }
  
  
  }
}

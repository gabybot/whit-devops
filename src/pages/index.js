import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Pet from "../models/Pet";
import Hours from '../components/Hours'; // Importación del componente Hours

const Index = ({ pets }) => {
  return (
    <>
      <h1> HOOLAAAA CODIGO FACILITOOOO</h1>
      <h1>Saludos desde CHI CHI CHI LE LE LE</h1>
      <h2>Gabriela Andrea Moya Moreno</h2>

      {/* Mostrar el componente Hours */}
      <Hours />

      {/* Crear una tarjeta para cada mascota */}
      {pets.length > 0 ? (
        pets.map((pet) => (
          <div key={pet._id}>
            <div className="card">
              <img src={pet.image_url} alt={`${pet.name}`} />
              <h5 className="pet-name">{pet.name}</h5>
              <div className="main-content">
                <p className="pet-name">{pet.name}</p>
                <p className="owner">Owner: {pet.owner_name}</p>

                {/* Información adicional de la mascota: Likes y Dislikes */}
                <div className="likes info">
                  <p className="label">Likes</p>
                  <ul>
                    {pet.likes.map((data, index) => (
                      <li key={index}>{data}</li>
                    ))}
                  </ul>
                </div>
                <div className="dislikes info">
                  <p className="label">Dislikes</p>
                  <ul>
                    {pet.dislikes.map((data, index) => (
                      <li key={index}>{data}</li>
                    ))}
                  </ul>
                </div>

                <div className="btn-container">
                  <Link href="/[id]/edit" as={`/${pet._id}/edit`}>
                    <button className="btn edit">Edit</button>
                  </Link>
                  <Link href="/[id]" as={`/${pet._id}`}>
                    <button className="btn view">View</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No pets found</p> // Mensaje alternativo si no hay mascotas
      )}
    </>
  );
};

/* Recupera los datos de las mascotas desde la base de datos MongoDB */
export async function getServerSideProps() {
  try {
    await dbConnect(); // Conexión a la base de datos

    const result = await Pet.find({}); // Obtiene todas las mascotas
    const pets = result.map((doc) => {
      const pet = doc.toObject();
      pet._id = pet._id.toString();
      return pet;
    });

    return { props: { pets } };
  } catch (error) {
    console.error("Error connecting to database:", error);
    return { props: { pets: [] } }; // Devuelve un array vacío si falla la conexión
  }
}

export default Index;


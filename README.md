
# KURAY: Monitoreo y Recomendaciones para Plagas Agrícolas

**KURAY** es una aplicación web interactiva que  
- Permite visualizar el clima en tu región
- Implementa el crowdsourcing de plagas agrícola
- Proporciona insights de exportación global

---

## Estructura del proyecto


## **Objetivo del Proyecto**
El objetivo principal de KURAY es proporcionar una plataforma visual y accesible para:
1. Monitorear la aparición de plagas agrícolas en diferentes regiones.
2. Obtener recomendaciones de cultivo personalizadas utilizando IA.
3. Filtrar noticias relevantes para la planificación agrícola y el comercio internacional.

---

## **Características Principales**
- **Mapa Interactivo:** Visualiza reportes de plagas utilizando `Leaflet` con íconos personalizados dinámicos por tipo de plaga.
- **Filtros Avanzados:** Filtra reportes por región, rango de fechas y busca por el nombre de la plaga.
- **Recomendaciones Personalizadas:** Utiliza un botón "¿Qué hacer?" en los popups del mapa para mostrar recomendaciones detalladas sobre cómo manejar la plaga seleccionada, obtenidas a través de la API de OpenAI.
- **Interfaz Amigable:** Diseño responsivo y centrado en la experiencia del usuario.

---

## **Configuración Inicial**

### **Requisitos Previos**
- Node.js (versión 18 o superior recomendada).
- npm o yarn para la gestión de dependencias.
- API Key de OpenAI para obtener recomendaciones personalizadas.

### **Pasos para Instalar y Ejecutar el Proyecto**
1. Clona este repositorio en tu máquina local:
   ```bash
   git clone <repositorio_url>
   cd kuray
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env.local` en la raíz del proyecto y añade la API Key de OpenAI:
   ```plaintext
   OPENAI_API_KEY=<tu_api_key>
   ```
4. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Abre el navegador y accede a `http://localhost:3000`.

---

## **Uso de la Aplicación**

### **Interfaz Principal**
1. **Mapa de Plagas:**
   - Al cargar la página, se muestran todos los reportes de plagas en el mapa.
   - Cada plaga tiene un ícono personalizado basado en su tipo.
2. **Filtros:**
   - Busca por región escribiendo en el campo "Buscar por región".
   - Filtra por rango de fechas usando los selectores "Desde" y "Hasta".
   - Busca una plaga específica ingresando su nombre en "Buscar plaga".
3. **Recomendaciones:**
   - Haz clic en un marcador del mapa para abrir un popup con detalles de la plaga.
   - Haz clic en el botón "¿Qué hacer?" dentro del popup para obtener recomendaciones, que aparecerán en el panel lateral derecho.

---

## **Detalles Técnicos**

### **Dependencias Clave**
| Paquete       | Descripción                                                  |
|---------------|--------------------------------------------------------------|
| `next`        | Framework para aplicaciones React con renderizado SSR y SSG. |
| `react`       | Biblioteca para la construcción de interfaces de usuario.    |
| `axios`       | Cliente HTTP para manejar peticiones a APIs externas.        |
| `leaflet`     | Biblioteca para mapas interactivos.                          |

### **Estructura del Proyecto**
```
src/
├── app/
│   ├── layout.tsx         # Layout general de la aplicación.
│   ├── page.tsx           # Página principal con mapa y filtros.
│   ├── api/
│       └── recommendations.ts # Endpoint local para manejar la API de recomendaciones.
├── components/
│   ├── PestsMap.tsx       # Componente del mapa con marcadores y popups.
│   ├── ViewSelector.tsx   # Selector para cambiar vistas.
├── styles/
│   ├── globals.css        # Estilos globales para la aplicación.
```

### **Integración con OpenAI API**
La integración con OpenAI se realiza en el archivo `api/recommendations.ts`:
1. Recibe las solicitudes desde el cliente con los datos de la plaga (nombre, región, fecha).
2. Envía la solicitud a OpenAI GPT-3.5 Turbo o GPT-4 utilizando la API Key proporcionada.
3. Devuelve las recomendaciones personalizadas al cliente.

Ejemplo de solicitud enviada a OpenAI:
```json
{
  "model": "gpt-3.5-turbo",
  "messages": [
    { "role": "system", "content": "Eres un experto en manejo de plagas agrícolas." },
    { "role": "user", "content": "Recomendaciones para manejar la plaga 'Araña roja' en la región 'Acolla', reportada el 2024-11-16." }
  ]
}
```

---

## **Metas del Proyecto**
1. **Optimizar la toma de decisiones agrícolas:** Facilitar el acceso a información relevante sobre plagas y recomendaciones de planificación.
2. **Escalabilidad:** Adaptar la aplicación para incluir más funcionalidades, como reportes en tiempo real o análisis históricos.
3. **Contribuir al sector agrícola:** Ofrecer una herramienta accesible y efectiva para mejorar la productividad y reducir pérdidas en cultivos.

---

## **Mejoras Futuras**
- Añadir funcionalidad para que los usuarios reporten nuevas plagas.
- Visualización histórica de plagas para análisis de patrones.
- Exportación de datos a CSV o integración con sistemas ERP agrícolas.


---

Si tienes preguntas o deseas contribuir, ¡no dudes en contactarnos! 🚀

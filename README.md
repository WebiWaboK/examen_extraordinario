# 📐 Regex Visualizer – App de Expresiones Regulares

Aplicación móvil desarrollada con **React Native + Expo** que permite escribir expresiones regulares, probarlas en tiempo real y visualizar su estructura como un diagrama de ferrocarril interactivo. También incluye historial de expresiones recientes, sugerencias de patrones comunes y soporte para interpretación sintáctica (AST).

---

## 🚀 Instalación y ejecución

1. **Clonar el repositorio:**

```bash
git clone https://github.com/tu-usuario/regex-visualizer-app.git
cd regex-visualizer-app
```

2. **Instalar dependencias:**

```bash
npm install
```

3. **Iniciar el proyecto:**

```bash
npx expo start
```

4. **Escanear QR** (usando Expo Go) o correr en emulador Android/iOS desde la interfaz web de Expo.

---

## 🧠 Funcionalidades principales

* Validación y coincidencias en tiempo real.
* Representación visual interactiva del patrón mediante diagramas.
* Sugerencias de expresiones comunes.
* Historial de expresiones utilizadas recientemente.
* Análisis sintáctico (AST) de la RegEx.
* Interfaz responsiva, clara y accesible.

---

## 🏗️ Arquitectura y tecnologías

La aplicación sigue los principios de **Clean Architecture** y **MVVM**, lo cual permite una separación clara entre lógica de dominio, lógica de presentación y componentes visuales.

Se ha utilizado **Atomic Design** para estructurar los componentes de UI:

```
📂 components/
├── atoms/
├── molecules/
└── organisms/
```

### 🔧 Librerías principales

* **React Native** (base del proyecto)
* **Expo** (CLI simplificada)
* **TypeScript** (tipado estricto)
* **AsyncStorage** (`@react-native-async-storage/async-storage`) para persistencia local
* **React Navigation** (`expo-router`) para el manejo de pantallas

---

## 🔁 Flujo de datos

```plaintext
Usuario escribe patrón
        ↓
Valida y analiza con `parseRegex()`
        ↓
Genera AST + Coincidencias
        ↓
Visualiza en diagrama (InteractiveRailroad)
        ↓
Después de 5 segundos sin errores
        ↓
Guarda en AsyncStorage
        ↓
Se puede consultar desde vista de historial
```

---

## 📁 Estructura de carpetas (simplificada)

```
src/
├── components/            ← Componentes UI (Atomic Design)
├── data/
│   └── repositories/      ← Funciones de almacenamiento (AsyncStorage)
├── domain/
│   └── entities/          ← Tipos como RegexASTNode
├── screens/               ← Pantallas principales
├── viewmodels/            ← Hooks personalizados (MVVM)
```

---

## 📝 Notas adicionales

* El guardado de expresiones recientes se realiza automáticamente tras una pausa de escritura de 5 segundos.
* Solo se guardan patrones válidos y completos.
* La aplicación ha sido optimizada para dispositivos móviles Android.

---

¿Te gustaría que también genere el `package.json` con las dependencias y scripts?

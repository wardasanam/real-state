# **Estately \- Real Estate Platform**

Estately is a visually immersive, fully responsive real estate application built with **React** and **Tailwind CSS**. It features a high-end "Glassmorphism" UI, interactive 3D elements, and smooth animations to provide a premium user experience for browsing properties, calculating mortgages, and connecting with agents.

## **🌟 Key Features**

* **Immersive UI**:  
  * **3D Tilt Cards**: Interactive property and agent cards that respond to mouse movement.  
  * **Glassmorphism**: Frosted glass effects for search bars, modals, and navigation.  
  * **Dynamic Backgrounds**: Context-aware background images that change based on the active page.  
  * **Fluid Animations**: Smooth entrances, floating elements, and metallic shine effects.  
* **Property Browsing**:  
  * Extensive property listing feed with high-quality imagery.  
  * **Advanced Filtering**: Filter by Location, Type (Buy/Rent), Price Range, Bedrooms, and Square Footage.  
  * **Detailed View**: Comprehensive property details modal with image galleries and agent contact info.  
* **Tools & Resources**:  
  * **Mortgage Calculator**: Real-time monthly payment estimation based on home price, down payment, interest rate, and loan term.  
  * **Agent Directory**: Browse elite agents with direct contact options.  
  * **Contact Forms**: Integrated modal forms for support and inquiries.

## **🛠️ Tech Stack**

* **Frontend Framework**: [React](https://reactjs.org/)  
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)  
* **Icons**: [Lucide React](https://lucide.dev/)  
* **Build Tool**: Vite (Recommended)

## **🚀 Getting Started**

Follow these steps to set up the project locally.

### **Prerequisites**

* Node.js (v14 or higher)  
* npm or yarn

### **Installation**

1. **Clone the repository** (or create your project folder):  
   git clone \[https://github.com/yourusername/estately.git\](https://github.com/yourusername/estately.git)  
   cd estately

2. **Install Dependencies**:  
   npm install

3. Install Required Icon Library:  
   Note: This project uses lucide-react for icons. If you see an import error, ensure this is installed.  
   npm install lucide-react

4. **Start the Development Server**:  
   npm run dev

## **🎨 Configuration**

### **Tailwind CSS Setup**

To achieve the custom animations (float, shine, 3D perspective), ensure your configuration files are set up correctly.

1. tailwind.config.js:  
   Make sure your config includes the custom keyframes and animation utilities defined in the project files.  
2. index.css:  
   Ensure the @layer utilities section includes the custom classes for .gradient-text, .shine-effect, .glass-panel, and the 3D perspective classes.

### **Custom Styles Reference**

The project uses specific custom classes defined in index.css:

* shine-effect: Adds a passing metallic sheen animation to buttons/cards.  
* gradient-text: Creates a flowing color gradient text effect.  
* perspective-1000: Sets up the 3D space for the tilt cards.

## **📂 Project Structure**

src/  
├── App.jsx            \# Main application logic and routing  
├── index.css          \# Tailwind directives and custom animations  
├── main.jsx           \# Entry point  
└── assets/            \# Static assets

## **🤝 Contributing**

Contributions, issues, and feature requests are welcome\!

## **📄 License**

This project is open source and available under the [MIT License](https://www.google.com/search?q=LICENSE).
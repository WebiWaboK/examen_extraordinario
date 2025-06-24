import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Editor de Regex",
          title: "Expresiones regulares",
        }}
      />
      <Drawer.Screen
        name="regex_manual"
        options={{
          drawerLabel: "Manual de símbolos",
          title: "Expresiones que se Usan",
        }}
      />
      <Drawer.Screen
        name="regex_recent"
        options={{
          drawerLabel: "Expreciones Recientes",
          title: "Expresiones Recientes",
        }}
      />
    </Drawer>
  );
}

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import ListarBaladas from "./screens/ListarBaladas";
import ConsultarPorCidade from "./screens/ConsultarPorCidade";
import ConsultarPorData from "./screens/ConsultarPorData";
import CriarBalada from "./screens/CriarBalada";
import AtualizarBalada from "./screens/AtualizarBalada";
import DeletarBalada from "./screens/DeletarBalada";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Listar Baladas">
        <Drawer.Screen name="Listar Baladas" component={ListarBaladas} />
        <Drawer.Screen
          name="Consultar por Cidade"
          component={ConsultarPorCidade}
        />
        <Drawer.Screen name="Consultar por Data" component={ConsultarPorData} />
        <Drawer.Screen name="Criar Balada" component={CriarBalada} />
        <Drawer.Screen name="Atualizar Balada" component={AtualizarBalada} />
        <Drawer.Screen name="Deletar Balada" component={DeletarBalada} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { RegexASTNode } from '../../../domain/entities/RegexASTNode';
import { RegexNodeBox } from '../atoms/RegexNodeBox';
import { NodeDescriptionModal } from '../../modals/NodeDescriptionModal';

interface Props {
  ast: RegexASTNode[];
}

export const InteractiveRailroad = ({ ast }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  const getLabel = (node: RegexASTNode): string => {
    switch (node.type) {
      case 'literal':
        return node.value;
      case 'anchor':
        return node.kind;
      case 'quantifier':
        return `{${node.min},${node.max === Infinity ? '∞' : node.max}}`;
      case 'characterClass':
        return `[${node.value}]`;
      case 'group':
        const content = node.children.map(getLabel).join('');
        return `(${content})`;
      case 'alternation':
        return '|';
      default:
        return 'n/a';
    }
  };

  const getColor = (node: RegexASTNode): string => {
    switch (node.type) {
      case 'literal': return '#E0F7FA';
      case 'quantifier': return '#C0F0B0';
      case 'characterClass': return '#D1C4E9';
      case 'group': return '#FDF5BF';
      case 'alternation': return '#FFCDD2';
      case 'anchor': return '#C6E2FF';
      default: return '#DDD';
    }
  };

  const renderNodeWithArrow = (
    node: RegexASTNode,
    key: number,
    total: number
  ) => {
    const label = getLabel(node);
    const color = getColor(node);
    const onPress = () => {
      setModalText(getDescription(node));
      setModalVisible(true);
    };

    return (
      <View key={key} style={styles.nodeWithArrow}>
        <RegexNodeBox label={label} color={color} onPress={onPress} />
        {key < total - 1 && (
          <Svg height={30} width={20} style={styles.arrow}>
            <Line x1="0" y1="15" x2="20" y2="15" stroke="#888" strokeWidth="2" />
            <Line x1="14" y1="10" x2="20" y2="15" stroke="#888" strokeWidth="2" />
            <Line x1="14" y1="20" x2="20" y2="15" stroke="#888" strokeWidth="2" />
          </Svg>
        )}
      </View>
    );
  };

  const getDescription = (node: RegexASTNode): string => {
    switch (node.type) {
      case 'literal': return `Carácter literal: "${node.value}"`;
      case 'anchor': return `Ancla de línea: "${node.kind}" (inicio o fin)`;
      case 'quantifier':
        return `Cuantificador entre ${node.min} y ${node.max === Infinity ? '∞' : node.max} repeticiones.`;
      case 'characterClass': return `Conjunto de caracteres: [${node.value}]`;
      case 'group':
        return `Grupo de subexpresiones: (${node.children.map(getLabel).join('')})`;
      case 'alternation':
        return `Alternador entre ${node.options.length} opciones`;
      default: return 'Nodo desconocido.';
    }
  };

  const allNodes: RegexASTNode[] = [
    { type: 'anchor', kind: '^' },
    ...ast,
    { type: 'anchor', kind: '$' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {allNodes.map((node, i) =>
          renderNodeWithArrow(node, i, allNodes.length)
        )}
      </View>

      <NodeDescriptionModal
        visible={modalVisible}
        text={modalText}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
  },
  nodeWithArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  arrow: {
    marginHorizontal: 4,
  },
});

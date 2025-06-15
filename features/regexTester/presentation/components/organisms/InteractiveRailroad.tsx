import React, { useState, JSX } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { RegexASTNode } from '../../../domain/entities/RegexASTNode';
import { RegexNodeBox } from '../atoms/RegexNodeBox';
import { RegexDiagramGroup } from '../molecules/RegexDiagramGroup';
import { NodeDescriptionModal } from '../../modals/NodeDescriptionModal';

interface Props {
  ast: RegexASTNode[];
}

export const InteractiveRailroad = ({ ast }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  const getLabel = (node: RegexASTNode): string => {
    switch (node.type) {
      case 'literal': return node.value;
      case 'anchor': return node.kind;
      case 'quantifier': return `{${node.min},${node.max === Infinity ? '∞' : node.max}}`;
      case 'characterClass': return `[${node.value}]`;
      case 'group': return '(...)';
      case 'alternation': return '|';
      default: return 'n/a';
    }
  };

  const getGroupContent = (children: RegexASTNode[]): string => {
    return children
      .map((child) => {
        switch (child.type) {
          case 'literal': return child.value;
          case 'characterClass': return `[${child.value}]`;
          case 'anchor': return child.kind;
          case 'quantifier': return `${getGroupContent([child.child])}{${child.min},${child.max === Infinity ? '∞' : child.max}}`;
          case 'group': return `(${getGroupContent(child.children)})`;
          case 'alternation': return child.options.map(opt => getGroupContent(opt)).join('|');
          default: return '?';
        }
      })
      .join('');
  };

  const getDescription = (node: RegexASTNode): string => {
    switch (node.type) {
      case 'literal': return `Carácter literal: "${node.value}"`;
      case 'anchor': return `Ancla de línea: "${node.kind}" (inicio o fin)`;
      case 'quantifier': return `Cuantificador entre ${node.min} y ${node.max === Infinity ? '∞' : node.max} repeticiones.`;
      case 'characterClass': return `Conjunto de caracteres: [${node.value}]`;
      case 'group': return `Grupo de subexpresiones: (${getGroupContent(node.children)})`;
      case 'alternation': return `Alternador entre ${node.options.length} opciones: ${node.options.map(opt => getGroupContent(opt)).join(' | ')}`;
      default: return 'Nodo desconocido.';
    }
  };

  const getColor = (node: RegexASTNode): string => {
    switch (node.type) {
      case 'literal': return '#E0F7FA';
      case 'quantifier': return '#C0F0B0';
      case 'characterClass': return '#D1C4E9';
      case 'group': return '#F0E68C';
      case 'alternation': return '#FFCDD2';
      case 'anchor': return '#C6E2FF';
      default: return '#DDD';
    }
  };

  const renderNode = (node: RegexASTNode, key: string | number): JSX.Element => {
    const onPress = () => {
      setModalText(getDescription(node));
      setModalVisible(true);
    };

    if (node.type === 'group') {
      return (
        <View key={key} style={styles.groupWrapper}>
          <RegexNodeBox label="(...)" color={getColor(node)} onPress={onPress} />
          <RegexDiagramGroup nodes={node.children} renderNode={renderNode} />
        </View>
      );
    }

    if (node.type === 'quantifier') {
      return (
        <View key={key} style={styles.groupWrapper}>
          <RegexDiagramGroup nodes={[node.child]} renderNode={renderNode} />
          <RegexNodeBox label={getLabel(node)} color={getColor(node)} onPress={onPress} />
        </View>
      );
    }

    if (node.type === 'alternation') {
      return (
        <View key={key} style={styles.altGroup}>
          <RegexNodeBox label="|" color={getColor(node)} onPress={onPress} />
          {node.options.map((opt, i) => (
            <View key={`${key}-alt${i}`} style={styles.optionGroup}>
              {opt.map((child, j) =>
                renderNode(child, `${key}-alt${i}-${j}`)
              )}
            </View>
          ))}
        </View>
      );
    }

    return (
      <RegexNodeBox
        key={key}
        label={getLabel(node)}
        color={getColor(node)}
        onPress={onPress}
      />
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.row}>
        <RegexNodeBox
          label="^"
          color="#C6E2FF"
          onPress={() => {
            setModalText('Inicio del patrón');
            setModalVisible(true);
          }}
        />
        {ast.map((node, i) => renderNode(node, i))}
        <RegexNodeBox
          label="$"
          color="#C6E2FF"
          onPress={() => {
            setModalText('Fin del patrón');
            setModalVisible(true);
          }}
        />
      </ScrollView>

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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
  },
  groupWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  altGroup: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  optionGroup: {
    flexDirection: 'row',
    marginVertical: 4,
    backgroundColor: '#FFF3F3',
    borderRadius: 6,
    padding: 4,
  },
});

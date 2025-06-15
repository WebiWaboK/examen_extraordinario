import React, {JSX} from 'react';
import { View, StyleSheet } from 'react-native';
import { RegexASTNode } from '../../../domain/entities/RegexASTNode';

interface Props {
  nodes: RegexASTNode[];
  renderNode: (node: RegexASTNode, key: string | number) => JSX.Element;
}

export const RegexDiagramGroup = ({ nodes, renderNode }: Props) => (
  <View style={styles.groupChildren}>
    {nodes.map((child, i) => renderNode(child, `group-${i}`))}
  </View>
);

const styles = StyleSheet.create({
  groupChildren: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 4,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderColor: '#aaa',
  },
});

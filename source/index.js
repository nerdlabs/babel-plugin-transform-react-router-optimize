export default function ({types: t}) {
	const canReplace = (node) => {
		return node.specifiers.every((specifier) => {
			return t.isImportSpecifier(specifier)
				&& specifier.imported.name !== 'default';
		});
	};

	const replace = (specifiers) => {
		return specifiers.map(({local, imported}) => {
			return t.importDeclaration(
				[t.importDefaultSpecifier(t.identifier(local.name))],
				t.stringLiteral(`react-router/lib/${imported.name}`)
			);
		});
	};

	return {
		visitor: {
			ImportDeclaration(path) {
				if (path.node.source.value === 'react-router') {
					if (canReplace(path.node)) {
						path.replaceWithMultiple(replace(path.node.specifiers));
					}
				}
			}
		}
	};
}

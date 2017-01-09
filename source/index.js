export default function ({types: t}) {
	const namespace = 'react-router/lib'
	const importMap = {
		createRoutes: 'RouteUtils',
		locationShape: 'PropTypes',
		routerShape: 'PropTypes',
		formatPattern: 'PatternUtils'
	}

	const canReplace = ({ specifiers }) => {
		return specifiers.length > 0 && specifiers.every((specifier) => {
			return t.isImportSpecifier(specifier)
				&& specifier.imported.name !== 'default';
		});
	};

	const replace = (specifiers) => {
		return specifiers.map(({local, imported}) => {
			const mapped = importMap[imported.name]

			if (typeof mapped !== 'undefined') {
				return t.importDeclaration(
					[t.importSpecifier(local, imported)],
					t.stringLiteral(`${namespace}/${mapped}`)
				);
			}

			return t.importDeclaration(
				[t.importDefaultSpecifier(local)],
				t.stringLiteral(`${namespace}/${imported.name}`)
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

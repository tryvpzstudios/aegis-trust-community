# Evidence Graph Relation Type Rules

**Status:** Implemented validation rules for the synthetic public prototype. These structural rules do not establish truth, authenticity, or evidentiary reliability.

The engine checks that the following relationship labels connect expected node types:

| Relationship | Source node | Destination node |
|---|---|---|
| `supports` | `evidence` | `claim` |
| `contradicts` | `evidence` | `claim` |
| `integrity_checked` | `evidence` | `evidence` |
| `observed_from` | `observation` | `evidence` |

A structurally invalid relation is rejected during graph validation. This is a schema/semantic guardrail only; the node labels and relationship assertions remain unverified input.

Other allowed relations are currently accepted without these type-pair rules. Their semantics remain limited and should be reviewed before the graph model is used beyond synthetic experiments.

## Non-inferences

- A `supports` edge does not prove a claim.
- A `contradicts` edge preserves a recorded conflict; it does not prove fraud.
- An `integrity_checked` edge does not authenticate a source or establish truth.
- `observed_from` records a relationship; it does not establish observer reliability.

## Regression coverage

The engine module tests and API tests include invalid node-type combinations for the rules above.

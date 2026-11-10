/**
 * blog.js
 * Single Source of Truth for AI Club Research Articles & Engineering Blog Posts.
 * Fulfills PRD 4.7 specifications.
 */

export const BLOG_POSTS = [
  {
    id: 'post-001',
    slug: 'demystifying-multi-head-latent-attention-mla',
    title: 'Demystifying Multi-Head Latent Attention (MLA) in Frontier LLMs',
    summary: 'A deep mathematical and engineering deconstruction of how low-rank KV compression slashes KV cache memory overhead by up to 85% during high-concurrency generation.',
    author: 'Rhea Sen',
    authorRole: 'Head of Research, AI Club',
    publishDate: '2026-11-04',
    readTime: '8 min read',
    category: 'Architecture Deep Dive',
    tags: ['MLA', 'DeepSeek', 'KV Cache', 'Transformers'],
    status: 'published', // 'published' | 'draft' | 'archived'
    references: [
      { title: 'DeepSeek-V3 Technical Report', url: 'https://github.com/deepseek-ai/DeepSeek-V3' },
      { title: 'FlashAttention-3: Fast and Memory-Efficient Exact Attention', url: 'https://arxiv.org/abs/2407.08608' },
    ],
    body: `
### The KV Cache Memory Wall

In autoregressive transformer generation, caching Key and Value states across generation steps is necessary to avoid recomputing past tokens. However, with context lengths scaling to 32k, 64k, and 128k tokens, KV cache allocation quickly eclipses model weight storage.

Multi-Query Attention (MQA) and Grouped-Query Attention (GQA) reduce this footprint by sharing keys and values across query heads. However, they enforce a hard structural compression that can degrade retrieval precision.

### How Multi-Head Latent Attention Works

Multi-Head Latent Attention (MLA) addresses this tradeoff by introducing low-rank joint key-value compression. Instead of caching high-dimensional key and value matrices directly:

1. **Down-Projection into Latent Vector**: Hidden states are projected down into a compressed latent representation $c_t^{KV}$ of dimensionality $d_c \\ll d_h \\times n_h$.
2. **Decoupled Rotary Positional Embeddings (RoPE)**: Rotary embeddings are applied to a dedicated sub-vector rather than the full compressed latent representation, preserving relative positional invariance without inflating cache size.
3. **On-the-Fly Up-Projection**: During attention matrix generation, the compressed latent state is multiplied by up-projection weight matrices integrated directly into the query-key GEMM kernel.

### Empirical Results from AI Club Profiling

During our local benchmark sweeps on dual RTX 4090 workstations:
- Peak GPU memory consumption dropped from **18.4 GB** to **4.8 GB** for a 16k context prompt sequence.
- Throughput on vLLM serving engines increased by **1.92x** under concurrent batch loads.

### Key Takeaway for Student Builders

MLA demonstrates that architectural innovations at the linear algebra layer yield larger efficiency leaps than brute-force hardware scaling. We encourage members working on local LLM serving to inspect our reproducible implementation in the club GitHub repository.
    `,
  },
  {
    id: 'post-002',
    slug: 'writing-custom-triton-kernels-for-fp8-quantization',
    title: 'Writing Custom Triton Kernels for FP8 Inference on Workstation GPUs',
    summary: 'Practical guide to replacing standard PyTorch matrix multiplication with fused FP8 scaled GEMM kernels written in OpenAI Triton.',
    author: 'Aarav Sharma',
    authorRole: 'Systems Lead, AI Club',
    publishDate: '2026-10-21',
    readTime: '11 min read',
    category: 'Systems Engineering',
    tags: ['Triton', 'CUDA', 'FP8', 'Quantization'],
    status: 'published',
    references: [
      { title: 'OpenAI Triton Programming Guide', url: 'https://triton-lang.org' },
      { title: 'NVIDIA Hopper Tuning Guide', url: 'https://docs.nvidia.com' },
    ],
    body: `
### Why Move Beyond PyTorch Native Operators?

Standard deep learning frameworks provide highly optimized cuBLAS calls. However, when combining dequantization, scaling factors, and activation functions, separate kernel launches incur significant memory bandwidth overhead.

Writing fused kernels in OpenAI Triton allows researchers to achieve near-CUDA C++ performance directly in Python without navigating raw PTX assembly.

### Memory Coalescing & Block Level Tiling

The primary consideration when writing Triton kernels is aligning memory access patterns with GPU cache line boundaries:

\`\`\`python
@triton.jit
def fp8_gemm_kernel(
    a_ptr, b_ptr, c_ptr,
    M, N, K,
    stride_am, stride_ak,
    stride_bk, stride_bn,
    stride_cm, stride_cn,
    BLOCK_SIZE_M: tl.constexpr,
    BLOCK_SIZE_N: tl.constexpr,
    BLOCK_SIZE_K: tl.constexpr,
):
    # Kernel code mapping program IDs to matrix tiles
    pid = tl.program_id(axis=0)
    # Tiled matrix multiplication with fused scale multiplication
\`\`\`

### Benchmark Findings

- Fused dequantization reduced kernel launch count from 3 to 1.
- Sustained memory throughput reached **82% of peak theoretical bandwidth** on Ada Lovelace architecture.
    `,
  },
  {
    id: 'post-003',
    slug: 'building-autonomous-ide-agents-with-mcp',
    title: 'Building Autonomous IDE Agents with Model Context Protocol (MCP)',
    summary: 'How the Model Context Protocol standardizes sandboxed tool execution, file tree inspection, and terminal diagnostics for coding assistants.',
    author: 'Vikramaditya Rao',
    authorRole: 'Autonomous Systems Coordinator',
    publishDate: '2026-10-09',
    readTime: '6 min read',
    category: 'Agentic Systems',
    tags: ['MCP', 'Autonomous Agents', 'Developer Tools'],
    status: 'published',
    references: [
      { title: 'Model Context Protocol Specification', url: 'https://modelcontextprotocol.io' },
    ],
    body: `
### The Protocol Standardization Problem

Before MCP, every developer framework implemented custom ad-hoc JSON schemas for function calling and tool interfaces. This fragmented agentic tool ecosystems and forced tool authors to maintain multiple adapter harnesses.

The open Model Context Protocol establishes clean JSON-RPC 2.0 communication between client hosts (IDEs, desktop agents) and tool servers (file inspection, database querying, testing harnesses).

### Club Implementations

AI Club currently runs an internal MCP server connecting local test runners directly to our development workflow, catching regression bugs during student hackathons automatically.
    `,
  },
];


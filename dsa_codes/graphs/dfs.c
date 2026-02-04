// Graph - DFS (Depth First Search)
#include <stdio.h>
#define MAX 100

void DFSUtil(int graph[][MAX], int vertices, int vertex, int visited[]) {
    visited[vertex] = 1;
    printf("%d ", vertex);
    
    for (int i = 0; i < vertices; i++) {
        if (graph[vertex][i] == 1 && !visited[i]) {
            DFSUtil(graph, vertices, i, visited);
        }
    }
}

void DFS(int graph[][MAX], int vertices, int start) {
    int visited[MAX] = {0};
    
    printf("DFS Traversal: ");
    DFSUtil(graph, vertices, start, visited);
    printf("\n");
}

int main() {
    int vertices = 5;
    int graph[MAX][MAX] = {
        {0, 1, 1, 0, 0},
        {1, 0, 0, 1, 1},
        {1, 0, 0, 0, 1},
        {0, 1, 0, 0, 0},
        {0, 1, 1, 0, 0}
    };
    
    DFS(graph, vertices, 0);
    
    return 0;
}

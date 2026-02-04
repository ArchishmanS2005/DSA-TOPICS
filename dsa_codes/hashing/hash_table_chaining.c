// Hash Table with Chaining
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define TABLE_SIZE 10

struct Node {
    int key;
    int value;
    struct Node* next;
};

struct Node* hashTable[TABLE_SIZE];

void initHashTable() {
    for (int i = 0; i < TABLE_SIZE; i++) {
        hashTable[i] = NULL;
    }
}

int hashFunction(int key) {
    return key % TABLE_SIZE;
}

void insert(int key, int value) {
    int index = hashFunction(key);
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->key = key;
    newNode->value = value;
    newNode->next = hashTable[index];
    hashTable[index] = newNode;
}

int search(int key) {
    int index = hashFunction(key);
    struct Node* temp = hashTable[index];
    
    while (temp != NULL) {
        if (temp->key == key) {
            return temp->value;
        }
        temp = temp->next;
    }
    
    return -1;
}

void display() {
    for (int i = 0; i < TABLE_SIZE; i++) {
        printf("Index %d: ", i);
        struct Node* temp = hashTable[i];
        while (temp != NULL) {
            printf("(%d, %d) -> ", temp->key, temp->value);
            temp = temp->next;
        }
        printf("NULL\n");
    }
}

int main() {
    initHashTable();
    
    insert(1, 10);
    insert(11, 20);
    insert(21, 30);
    insert(2, 40);
    insert(12, 50);
    
    display();
    
    printf("\nSearch key 11: %d\n", search(11));
    printf("Search key 25: %d\n", search(25));
    
    return 0;
}

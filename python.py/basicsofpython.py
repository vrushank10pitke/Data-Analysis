
import matplotlib.pyplot as plt

x_values = input("Enter x values separated by commas: ")
x_values = [float(value) for value in x_values.split(",")]
y_values = [x ** 2 for x in x_values]

print("x\t y")
for x, y in zip(x_values, y_values):
    print(f"{x}\t {y}")

plt.plot(x_values, y_values, marker="o")
plt.title("y = x^2")
plt.xlabel("x")
plt.ylabel("y")
plt.grid(True)
plt.show()

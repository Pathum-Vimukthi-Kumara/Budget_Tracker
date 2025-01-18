using System.Windows.Media;
using System.Windows;

public static class VisualTreeHelperExtensions
{
    public static IEnumerable<T> FindChildren<T>(this DependencyObject depObj) where T : DependencyObject
    {
        if (depObj == null) yield break;

        for (int i = 0; i < VisualTreeHelper.GetChildrenCount(depObj); i++)
        {
            var child = VisualTreeHelper.GetChild(depObj, i);
            if (child is T t)
                yield return t;

            foreach (var childOfChild in FindChildren<T>(child))
                yield return childOfChild;
        }
    }
}
